import env from "@/server/env";
import { readSpreadsheet, SheetValues } from "@/utils/google";

export default async function querySchedule(): Promise<SheetValues[]> {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Full Schedule [PUBLIC FACING]!A1:M144");

	return sheetValues ?? [];
}
