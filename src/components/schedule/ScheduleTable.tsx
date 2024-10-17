"use client";

import { EventDetails, Schedule } from "@/server/routes/live/schedule";
import { trpc } from "@/utils/client";
import { useEffect, useState } from "react";
import ScheduleTime from "./ScheduleTime";
import ScheduleElement from "./ScheduleElement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ScheduleFilter from "./ScheduleFilter";

export type DayScheduleFilter = (value: [string, EventDetails[]]) => EventDetails[];

const CHECKBOX_DATA: { id: string; label: string; filter: DayScheduleFilter; className: string }[] = [
	{
		id: "main-events-filter-checkbox",
		label: "Main Events",
		filter: (event: [string, EventDetails[]]) => event[1].filter((event: EventDetails) => !event.host),
		className: "border-faded-neon-blue border-2 data-[state=checked]:bg-faded-neon-blue text-transparent",
	},
	{
		id: "workshops-events-filter-checkbox",
		label: "Workshops",
		filter: (event: [string, EventDetails[]]) => event[1].filter((event: EventDetails) => event.host),
		className: "border-faded-neon-green border-2 data-[state=checked]:bg-faded-neon-green text-transparent",
	},
	{
		id: "meals-events-filter-checkbox",
		label: "Meals",
		filter: (event: [string, EventDetails[]]) =>
			event[1].filter((event: EventDetails) =>
				["breakfast", "brunch", "lunch", "dinner", "snack"].some((meal: string) =>
					event.title.toLowerCase().includes(meal),
				),
			),
		className: "border-faded-neon-yellow border-2 data-[state=checked]:bg-faded-neon-yellow text-transparent",
	},
];

export default function ScheduleTable(): React.ReactNode {
	const getSchedule = trpc.getSchedule.useQuery();

	const [days, setDays] = useState<string[]>([]);
	const [currentDay, setCurrentDay] = useState<string>("");
	const [eventFilters, setEventFilters] = useState<DayScheduleFilter[]>([]);

	useEffect(() => {
		if (getSchedule.data) {
			setDays(Object.keys(getSchedule.data));
			setCurrentDay(Object.keys(getSchedule.data)[0]);
		}
	}, [getSchedule.data]);

	if (getSchedule.data && days && currentDay) {
		return (
			<Tabs defaultValue={currentDay} className="flex w-4/5 flex-col items-center bg-transparent sm:w-3/5">
				<div className="grid h-full w-full grid-cols-2 sm:grid-cols-[1fr_2fr_1fr]">
					<TabsList className="mb-8 h-fit w-full justify-start gap-x-2 bg-transparent sm:col-start-2 sm:col-end-3 sm:w-full sm:gap-x-4">
						{days.map((day: string) => (
							<TabsTrigger
								key={`trigger-${day}`}
								value={day}
								onClick={(event) => setCurrentDay(event.currentTarget.innerText)}
								className="h-fit w-fit bg-transparent font-ppmondwest text-sm font-semibold hover:text-accent-foreground data-[state=active]:ring-2 data-[state=active]:ring-accent-foreground sm:w-full sm:text-lg"
							>
								{day}
							</TabsTrigger>
						))}
					</TabsList>

					<ScheduleFilter checkboxes={CHECKBOX_DATA} filters={eventFilters} setFilters={setEventFilters} />
				</div>
				{days.map((day: string) => (
					<TabsContent
						key={`content-${day}`}
						value={day}
						className="grid w-full grid-flow-row grid-cols-1 gap-y-4"
					>
						<DisplaySchedule schedule={getSchedule.data} day={currentDay} filters={eventFilters} />
					</TabsContent>
				))}
			</Tabs>
		);
	}
	return <></>;
}

function DisplaySchedule({
	schedule,
	day,
	filters,
}: {
	schedule: Schedule;
	day: string;
	filters: DayScheduleFilter[];
}): React.ReactNode {
	return Object.entries(schedule[day])
		.reduce((filteredEvents: Array<[string, EventDetails[]]>, [time, events]: [string, EventDetails[]]) => {
			const filtered = events
				.flat()
				.filter((event: EventDetails) =>
					filters.some((filter: DayScheduleFilter) => filter([time, [event]]).length > 0),
				);

			if (filtered.length > 0) {
				filteredEvents.push([time, filtered]);
			}
			return filteredEvents;
		}, [])
		.sort(sortByTime)
		.map(([time, events]: [string, EventDetails[]]) => {
			return (
				<div key={time} className="flex w-full justify-center gap-x-2">
					<ScheduleTime time={time} />
					<div className="flex w-full flex-col gap-y-2">
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
