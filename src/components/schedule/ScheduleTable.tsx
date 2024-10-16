"use client";

import { EventDetails, Schedule } from "@/server/routes/live/schedule";
import { trpc } from "@/utils/client";
import { useEffect, useState } from "react";
import ScheduleTime from "./ScheduleTime";
import ScheduleElement from "./ScheduleElement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ScheduleFilter from "./ScheduleFilter";
import { CHECKBOX_DATA } from "@/constant/constant";

export default function ScheduleTable(): React.ReactNode {
	const getSchedule = trpc.getSchedule.useQuery();

	const [days, setDays] = useState<string[]>([]);
	const [currentDay, setCurrentDay] = useState<string>("");

	useEffect(() => {
		if (getSchedule.data) {
			setDays(Object.keys(getSchedule.data));
			setCurrentDay(Object.keys(getSchedule.data)[0]);
		}
	}, [getSchedule.data]);

	if (getSchedule.data && days && currentDay) {
		return (
			<Tabs defaultValue={currentDay} className="flex w-4/5 flex-col items-center bg-transparent sm:w-3/5">
				<div className="grid w-full grid-cols-2 sm:grid-cols-[1fr_2fr_1fr]">
					<ScheduleFilter checkboxes={CHECKBOX_DATA} />

					<TabsList className="mb-8 w-full justify-end bg-transparent sm:w-full sm:justify-self-center">
						{days.map((day: string) => (
							<TabsTrigger
								key={`trigger-${day}`}
								value={day}
								onClick={(event) => setCurrentDay(event.currentTarget.innerText)}
								className="w-fit font-ppmondwest text-sm font-semibold data-[state=active]:bg-muted sm:w-full sm:text-lg"
							>
								{day}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
				{days.map((day: string) => (
					<TabsContent
						key={`content-${day}`}
						value={day}
						className="grid w-full grid-flow-row grid-cols-1 gap-y-4"
					>
						<DaySchedule schedule={getSchedule.data} day={currentDay} />
					</TabsContent>
				))}
			</Tabs>
		);
	}
	return <></>;
}

function DaySchedule({ schedule, day }: { schedule: Schedule; day: string }): React.ReactNode {
	return Object.entries(schedule[day])
		.sort(sortByTime)
		.map(([time, events]: [string, EventDetails[]]) => {
			return (
				<div key={time} className="flex w-full justify-center gap-x-2">
					<ScheduleTime time={time} />
					<div className="flex w-fit flex-col gap-y-2 sm:w-full">
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
