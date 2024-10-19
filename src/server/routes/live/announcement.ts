import env from "@/utils/env";
import { readSpreadsheet } from "@/utils/google";
import { EventDetails, parseEvent } from "./schedule";

export async function queryAnnouncement(): Promise<EventDetails> {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Announcement!A1:C3");

	return parseEvent(sheetValues?.[0].toString() ?? "") ?? { title: "" };
}

export interface Accouncement {
	content: string;
}
