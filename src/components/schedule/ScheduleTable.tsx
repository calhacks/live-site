"use client";

import { EventDetails, Schedule } from "@/server/routes/live/schedule";
import { trpc } from "@/utils/client";
import { useState } from "react";
import ScheduleTime from "./ScheduleTime";
import ScheduleElement from "./ScheduleElement";

export default function ScheduleTable(): React.ReactNode {
	const getSchedule = trpc.getSchedule.useQuery();

	const [currentDay] = useState<string>("Friday");

	return (
		!!getSchedule.data && (
			<div className="grid grid-flow-row grid-cols-1 gap-y-4 sm:w-2/5">
				<DaySchedule schedule={getSchedule.data} day={currentDay} />
			</div>
		)
	);
}

function DaySchedule({ schedule, day }: { schedule: Schedule; day: string }): React.ReactNode {
	return Object.entries(schedule[day])
		.sort(sortByTime)
		.map(([time, events]: [string, EventDetails[]]) => {
			return (
				<div key={time} className="flex w-full justify-center gap-x-2">
					<ScheduleTime time={time} />
					<div className="flex min-w-full flex-col gap-y-2">
						<ScheduleElement details={events} />
					</div>
				</div>
			);
		});
}
function sortByTime(a: [string, EventDetails[]], b: [string, EventDetails[]]): number {
	const convertTo24Hour = (time: string): string => {
		const [timePart, period] = time.split(" ");
		const [hoursStr, minutesStr] = timePart.split(":");
		let hours = Number(hoursStr);
		const minutes = Number(minutesStr);

		if (period === "PM" && hours !== 12) {
			hours += 12;
		} else if (period === "AM" && hours === 12) {
			hours = 0;
		}

		return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
	};

	const timeA = convertTo24Hour(a[0]);
	const timeB = convertTo24Hour(b[0]);

	return timeA.localeCompare(timeB);
}
