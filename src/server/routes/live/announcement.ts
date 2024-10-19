import env from "@/utils/env";
import { readSpreadsheet } from "@/utils/google";

export async function queryAnnouncement() {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Announcement!A1:C3");

	return {
		content: sheetValues?.[0] ?? "",
	};
}

export interface Accouncement {
	content: string;
}
