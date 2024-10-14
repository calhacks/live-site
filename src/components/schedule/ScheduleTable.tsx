"use client";

import { EventDetails, Schedule } from "@/server/routes/live/schedule";
import { trpc } from "@/utils/client";
import { useState } from "react";
import ScheduleTime from "./ScheduleTime";
import ScheduleElement from "./ScheduleElement";

function createDaySchedule(schedule: Schedule, day: string): React.ReactNode {
	return Object.entries(schedule[day]).map(([time, events]: [string, EventDetails[]]) => {
		return (
			<div key={time} className="flex justify-start gap-x-2">
				<ScheduleTime time={time} />
				<div className="flex flex-col gap-y-2">
					<ScheduleElement details={events} />
				</div>
			</div>
		);
	});
}

export default function ScheduleTable(): React.ReactNode {
	const getSchedule = trpc.getSchedule.useQuery();

	const [currentDay] = useState<string>("Friday");

	return (
		<div className="grid grid-flow-row grid-cols-1 gap-y-4">
			{getSchedule.data ? createDaySchedule(getSchedule.data, currentDay) : ""}
		</div>
	);
}
