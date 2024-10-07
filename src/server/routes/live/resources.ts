import env from "@/utils/env";
import { readSpreadsheet } from "@/utils/google";

export async function queryResources() {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Sponsor & Workshop Starter Packs!A1:D30");

	return sheetValues;
}
