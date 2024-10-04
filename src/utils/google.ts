import env from "@/server/env";
import { z } from "zod";
import { google, sheets_v4 } from "googleapis";
import NodeCache from "node-cache";
import logger from "@/utils/logger";

const scopes: Array<string> = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const auth = new google.auth.JWT({
	email: env.GOOGLE_CREDENTIALS_CLIENT_EMAIL,
	key: env.GOOGLE_CREDENTIALS_PRIVATE_KEY.replace(/\\n/g, "\n"),
	scopes: scopes,
});

const sheetsClient = google.sheets({
	version: "v4",
	auth: auth,
});

export const spreadsheetCache = new NodeCache({ stdTTL: 60 * 5 }); // 5 minute TTL

const spreadsheetToCacheKey = (spreadsheetId: string, range: string): string => spreadsheetId + range;

export async function readSpreadsheet(spreadsheetId: string, range: string): Promise<SheetData> {
	const cacheKey = spreadsheetToCacheKey(spreadsheetId, range);

	if (spreadsheetCache.has(cacheKey)) {
		const sheetData = spreadsheetCache.get<SheetData>(cacheKey);
		const parsedSheetData = sheetDataSchema.safeParse(sheetData);

		if (parsedSheetData.success) {
			return parsedSheetData.data;
		}

		logger.error(sheetData, "CACHED sheet data could not be properly parsed. REFETCHING.");
	}

	const spreadsheet = await sheetsClient.spreadsheets.get({
		auth: auth,
		spreadsheetId: spreadsheetId,
	});

	const masterSheet = spreadsheet.data.sheets?.find((sheet: sheets_v4.Schema$Sheet) => sheet.properties?.index === 0);
	if (!masterSheet) {
		throw new Error("ERROR: Master sheet not found.");
	}

	const sheetValues = (
		await sheetsClient.spreadsheets.values.get({ auth: auth, spreadsheetId: spreadsheetId, range: range })
	).data.values;

	const cachedSheetData: SheetData = {
		sheetValues: sheetValues ?? [],
		sheetMerges: masterSheet.merges ?? [],
	};

	const parsedSheetData = sheetDataSchema.safeParse(cachedSheetData);
	// This conditional should never evaluate to `true` as the fallback cases are valid. Only case it fails is if Google's API changes.
	if (!parsedSheetData.success) {
		logger.error(cachedSheetData, "FETCHED sheet data could not be properly parsed.");
	}

	spreadsheetCache.set<SheetData>(cacheKey, cachedSheetData);

	return cachedSheetData;
}

// Zod representation of `sheets_v4.Schema$ValueRange.values` interface
export const sheetValuesSchema = z.array(z.union([z.string(), z.boolean(), z.number()]));

// Zod representation of `sheets_v4.Schema$GridRange` interface
export const gridRangeSchema = z.object({
	endColumnIndex: z.optional(z.union([z.number(), z.null()])),
	endRowIndex: z.optional(z.union([z.number(), z.null()])),
	sheetId: z.optional(z.union([z.number(), z.null()])),
	startColumnIndex: z.optional(z.union([z.number(), z.null()])),
	startRowIndex: z.optional(z.union([z.number(), z.null()])),
});

export const sheetDataSchema = z.object({
	sheetValues: z.optional(z.nullable(z.array(sheetValuesSchema))),
	sheetMerges: z.array(gridRangeSchema),
});

export type SheetValues = z.infer<typeof sheetValuesSchema>;
export type GridRange = z.infer<typeof gridRangeSchema>;
export type SheetData = z.infer<typeof sheetDataSchema>;
