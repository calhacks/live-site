"use client";

import { EventDetails } from "@/server/routes/live/schedule";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export interface ScheduleElementProps {
	details: EventDetails[];
}

export default function ScheduleElement(props: ScheduleElementProps) {
	return props.details.map(({ title, description, location, host }: EventDetails) => {
		return (
			<Card key={title} className="w-60 min-w-fit sm:w-[400px] sm:max-w-[400px]">
				<CardHeader className="p-4">
					<CardTitle className="font-ppmondwest text-xl leading-normal sm:text-2xl">{title}</CardTitle>
					{!!(description || host) && (
						<CardDescription className="font-ppneuebit">
							{!!host && <span className="text-xl text-gray-300 sm:text-2xl">Hosted by: {host}</span>}
							{!!description && <span className="line-clamp-3 text-lg">{description}</span>}
						</CardDescription>
					)}
				</CardHeader>
				{!!location && (
					<CardFooter className="flex w-full justify-end">
						<span className="px-4 py-2 font-ppneuebit text-lg">Location: {location}</span>
					</CardFooter>
				)}
			</Card>
		);
	});
}
