import Schedule from "@/app/schedule/page";
import env from "@/utils/env";
import { readSpreadsheet, SheetValues } from "@/utils/google";
import { z } from "zod";

export async function querySchedule(): Promise<Schedule> {
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

	return sheetValues.reduce(
		([currentSchedule, currentDay]: [Schedule, string], row: SheetValues): [Schedule, string] => {
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

			if (day) {
				currentDay = day ?? currentDay;
			}

			// Check if there any events for the current time
			const isAnyEvents: boolean = allEvents.some((event: string) => event);

			// If there are no events, move on to next time
			if (!isAnyEvents) {
				return [currentSchedule, currentDay];
			}

			const events = allEvents.reduce((eventList: EventDetails[], event: string) => {
				const parsedEvent = parseEvent(event);
				if (!parsedEvent) {
					return eventList;
				}
				eventList.push(parsedEvent);
				return eventList;
			}, []);

			// Update the current schedule without overwriting existing values
			currentSchedule = {
				...currentSchedule, // Keep the existing schedule
				[currentDay]: {
					...(currentSchedule[currentDay] || {}), // Keep the existing day’s schedule
					[time]: events, // Update or add the new events for the given time
				},
			};

			return [currentSchedule, currentDay];
		},
		[{}, ""],
	)[0];
}

function parseEvent(eventString: string): EventDetails | null {
	// Remove comments (anything after @ or \)
	const commentIndex = eventString.search(/[@\\]/);
	if (commentIndex !== -1) {
		eventString = eventString.substring(0, commentIndex).trim();
	}

	// Define regex for various elements
	const titleRegex = /^[^\(\[\{]+/; // Everything before any parentheses, brackets, or braces
	const descriptionRegex = /\((?!http)[^\)]+\)/; // Parentheses content, ignoring http links
	const linkRegex = /\(http[^\)]+\)/; // Links inside parentheses
	const locationRegex = /\[([^\]]+)\]/; // Square brackets
	const hostRegex = /\{([^\}]+)\}/; // Curly braces

	// Extract title
	const titleMatch = eventString.match(titleRegex);
	const title = titleMatch ? titleMatch[0].trim() : "";

	if (!title) return null; // If no title, return null

	// Extract description (if any)
	const descriptionMatch = eventString.match(descriptionRegex);
	const description = descriptionMatch ? descriptionMatch[0].slice(1, -1).trim() : undefined;

	// Extract link (if any)
	const linkMatch = eventString.match(linkRegex);
	const link = linkMatch ? linkMatch[0].slice(1, -1).trim() : undefined;

	// Extract location (if any)
	const locationMatch = eventString.match(locationRegex);
	let location = locationMatch ? locationMatch[1].trim() : undefined;

	// If location contains '/', keep only content after '/'
	if (location && location.includes("/")) {
		location = location.split("/").pop()?.trim();
	}

	// Extract host (if any)
	const hostMatch = eventString.match(hostRegex);
	const host = hostMatch ? hostMatch[1].trim() : undefined;

	// Return structured object
	return {
		title,
		description,
		link,
		location,
		host,
	};
}

export const eventDetailsSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	link: z.string().optional(),
	location: z.string().optional(),
	host: z.string().optional(),
});
export const dayScheduleSchema = z.record(z.string(), z.array(eventDetailsSchema));
export const scheduleSchema = z.record(z.string(), dayScheduleSchema);

export type EventDetails = z.infer<typeof eventDetailsSchema>;
export type DaySchedule = z.infer<typeof dayScheduleSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
