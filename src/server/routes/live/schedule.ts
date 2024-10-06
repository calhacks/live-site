import env from "@/server/env";
import { readSpreadsheet, SheetValues } from "@/utils/google";
import logger from "@/utils/logger";

function lastElement<K, V>(map: Map<K, V>): [K, V] | undefined {
	let last: [K, V] | undefined = undefined;
	for (let entry of map) {
		last = entry;
	}
	return last;
}

function createTotalSchedule(sheetValues: SheetValues[]): Map<string, Map<string, string[]>> {
	// Ignore the first row; which are the titles of all the columns
	sheetValues.shift();

	return sheetValues.reduce((currentSchedule: Map<string, Map<string, string[]>>, row: SheetValues) => {
		const day: string = row[0]?.toString();
		const time: string = row[1]?.toString();
		const mainEvent: string = row[2]?.toString();
		const workshopsOne: string = row[3]?.toString();
		const workshopsTwo: string = row[4]?.toString();
		const workshopsThree: string = row[5]?.toString();
		const entertainment: string = row[6]?.toString();
		const meetups: string = row[7]?.toString();
		const teamBuilding: string = row[8]?.toString();
		const food: string = row[9]?.toString();

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
			currentSchedule.set(day, new Map<string, string[]>([["a", ["a"]]]));
		}

		// Check if there any events for the current time
		const isAnyEvents: boolean = allEvents.some((event: string) => event);

		// If there are no events for this time, continue
		if (!isAnyEvents) {
			return currentSchedule;
		}

		let last;
		for (const entry of currentSchedule) {
			last = entry;
		}

		last![1].set(time, allEvents);

		return currentSchedule;
	}, new Map());
}

export default async function querySchedule() {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Full Schedule [PUBLIC FACING]!A1:M144");

	/*
	 * `totalSchedule` can be thought of an array for each days' schedule
	 * e.g. `totalSchedule[0]` will be the first day's schedule, `totalSchedule[1]` will be the second day's schedule, etc.
	 */
	const totalSchedule: Map<string, Map<string, string[]>> = createTotalSchedule(sheetValues ?? []);

	function replacer(key, value) {
		if (value instanceof Map) {
			return {
				dataType: "Map",
				value: Array.from(value.entries()), // or with spread: value: [...value]
			};
		} else {
			return value;
		}
	}

	return JSON.stringify(totalSchedule, replacer);
}
