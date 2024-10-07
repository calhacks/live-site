import env from "@/server/env";
import { readSpreadsheet, SheetValues } from "@/utils/google";
import { z } from "zod";

export default async function querySchedule() {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Full Schedule [PUBLIC FACING]!A1:M144");

	/*
	 * `totalSchedule` can be thought of an array for each days' schedule
	 * e.g. `totalSchedule[0]` will be the first day's schedule, `totalSchedule[1]` will be the second day's schedule, etc.
	 */
	const totalSchedule: Schedule = createTotalSchedule(sheetValues ?? []);

	return totalSchedule;
}

function createTotalSchedule(sheetValues: SheetValues[]): Schedule {
	// Ignore the first row; which are the titles of all the columns
	sheetValues.shift();

	return sheetValues.reduce((currentSchedule: Schedule, row: SheetValues) => {
		const day: string = row[0]?.toString() ?? "";
		const time: string = row[1]?.toString() ?? "";
		const mainEvent: string = row[2]?.toString() ?? "";
		const workshopsOne: string = row[3]?.toString() ?? "";
		const workshopsTwo: string = row[4]?.toString() ?? "";
		const workshopsThree: string = row[5]?.toString() ?? "";
		const entertainment: string = row[6]?.toString() ?? "";
		const meetups: string = row[7]?.toString() ?? "";
		const teamBuilding: string = row[8]?.toString() ?? "";
		const food: string = row[9]?.toString() ?? "";

		const allEvents = [
			mainEvent,
			workshopsOne,
			workshopsTwo,
			workshopsThree,
			entertainment,
			meetups,
			teamBuilding,
			food,
		];

		// `day` is defined -> Encountered new `day`, create new schedule
		if (day) {
			currentSchedule.push([day, new Array<Event>()]);
		}

		// Check if there any events for the current time
		const isAnyEvents: boolean = allEvents.some((event: string) => event);

		// If there are no events, move on to next time
		if (!isAnyEvents) {
			return currentSchedule;
		}

		// Append the events to the current day's (last element of the schedule) schedule
		currentSchedule.at(-1)?.[1].push([time, allEvents]);

		return currentSchedule;
	}, []);
}

export const eventDetailsSchema = z.array(z.string()).length(8);
export const eventSchema = z.tuple([z.string(), eventDetailsSchema]);
export const dayScheduleSchema = z.tuple([z.string(), z.array(eventSchema)]);
export const scheduleSchema = z.array(dayScheduleSchema);

export type EventDetails = z.infer<typeof eventDetailsSchema>;
export type Event = z.infer<typeof eventSchema>;
export type DaySchedule = z.infer<typeof dayScheduleSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
