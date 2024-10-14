"use client";

import { EventDetails } from "@/server/routes/live/schedule";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

export interface ScheduleElementProps {
	details: EventDetails[];
}

export default function ScheduleElement(props: ScheduleElementProps) {
	return props.details.map(({ title, description, location, host }: EventDetails) => {
		return (
			<Card
				key={title}
				className={`w-60 min-w-fit sm:w-[400px] sm:max-w-[400px] ${!host ? "border-[#719697]" : "border-[#677545]"}`}
			>
				<CardHeader className="p-4">
					<div className="h-auto w-full sm:hidden">
						{!!description ? (
							<Drawer>
								<ExpandDetails isMobile={true} title={title} description={description} />
							</Drawer>
						) : (
							<span className="font-ppmondwest text-xl font-semibold leading-normal tracking-tight">
								{title}
							</span>
						)}
					</div>
					<div className="hidden sm:block">
						{!!description ? (
							<HoverCard>
								<ExpandDetails isMobile={false} title={title} description={description} />
							</HoverCard>
						) : (
							<span className="font-ppmondwest text-2xl font-semibold leading-normal tracking-tight">
								{title}
							</span>
						)}
					</div>
					{!!(description || host) && (
						<CardDescription className="font-ppneuebit">
							{!!host && <span className="text-xl text-gray-300 sm:text-2xl">Hosted by: {host}</span>}
							{!!description && <span className="line-clamp-3 text-lg">{description}</span>}
						</CardDescription>
					)}
				</CardHeader>
				{!!location && (
					<CardFooter className="flex w-full justify-end">
						<span className="px-4 py-2 font-ppneuebit text-lg sm:py-4">Location: {location}</span>
					</CardFooter>
				)}
			</Card>
		);
	});
}

function ExpandDetails({
	isMobile,
	title,
	description,
}: {
	isMobile: boolean;
	title: string;
	description?: string;
}): React.ReactNode {
	if (isMobile) {
		return (
			<>
				<DrawerTrigger className="w-full text-left">
					<CardTitle className="font-ppmondwest text-xl leading-normal underline">{title}</CardTitle>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="w-11/12 gap-y-2 place-self-center">
						<DrawerTitle className="font-ppmondwest leading-normal">{title}</DrawerTitle>
						{!!description && (
							<DrawerDescription className="font-ppneuebit text-lg">{description}</DrawerDescription>
						)}
					</DrawerHeader>
				</DrawerContent>
			</>
		);
	}

	return (
		<>
			<HoverCardTrigger className="w-full text-left">
				<CardTitle className="font-ppmondwest text-2xl leading-normal underline">{title}</CardTitle>
			</HoverCardTrigger>
			<HoverCardContent className="grid w-96 gap-y-2 border-gray-800">
				<div className="gap-y-2 text-center">
					{!!description && <span className="font-ppneuebit text-xl">{description}</span>}
				</div>
				{/* {!!link && <a className="font-ppneuebit text-lg text-muted-foreground">More information</a>} */}
			</HoverCardContent>
		</>
	);
}
