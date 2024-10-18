"use client";

import { EventDetails } from "@/server/routes/live/schedule";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { useEffect, useRef, useState } from "react";

export interface ScheduleElementProps {
	details: EventDetails[];
}

const borderColor = (title: string, host?: string) => {
	if (
		["breakfast", "brunch", "lunch", "dinner", "snack"].some((meal: string) => title.toLowerCase().includes(meal))
	) {
		return "border-faded-neon-yellow";
	}
	return !host ? "border-faded-neon-blue" : "border-faded-neon-green";
};

export default function ScheduleElement(props: ScheduleElementProps) {
	return props.details.map(({ title, description, location, host }: EventDetails) => {
		return (
			<Card key={title} className={`w-full ${borderColor(title, host)}`}>
				<CardHeader className="p-4">
					<Mobile>
						<Drawer>
							{description ? (
								<DrawerTrigger className="w-full text-left">
									<CardTitle
										className={`font-ppmondwest text-xl leading-normal ${description ? "underline" : "no-underline"}`}
									>
										{title}
									</CardTitle>
								</DrawerTrigger>
							) : (
								<CardTitle
									className={`font-ppmondwest text-xl leading-normal ${description ? "underline" : "no-underline"}`}
								>
									{title}
								</CardTitle>
							)}
							<DrawerContent>
								<DrawerHeader className="w-11/12 gap-y-2 place-self-center">
									<DrawerTitle className="font-ppmondwest leading-normal">{title}</DrawerTitle>
									{!!description && (
										<DrawerDescription className="break-words font-ppneuebit text-lg">
											{description}
										</DrawerDescription>
									)}
								</DrawerHeader>
							</DrawerContent>
						</Drawer>

						{!!(description || host) && <MobileDescription host={host} description={description} />}
					</Mobile>

					<Desktop>
						<CardTitle className="font-ppmondwest text-2xl leading-normal">{title}</CardTitle>
						{!!(description || host) && <DesktopDescription host={host} description={description} />}
					</Desktop>
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

function Mobile({ children }: { children?: React.ReactNode }): React.ReactNode {
	return <div className="h-auto w-full break-words sm:hidden">{children}</div>;
}

function Desktop({ children }: { children?: React.ReactNode }): React.ReactNode {
	return <div className="hidden break-words sm:block">{children}</div>;
}

function MobileDescription({
	host,
	description,
}: {
	host?: string | undefined;
	description?: string | undefined;
}): React.ReactNode {
	return (
		<CardDescription className="font-ppneuebit">
			{!!host && <span className="text-xl text-gray-300">Hosted by: {host}</span>}
			{!!description && <span className="line-clamp-3 text-lg">{description}</span>}
		</CardDescription>
	);
}

function DesktopDescription({ host, description }: { host?: string; description?: string }): React.ReactNode {
	const clampRef = useRef<HTMLSpanElement>(null);

	const [shouldReadMore, setShouldReadMore] = useState<boolean>(false);
	const [isClamped, setIsClamped] = useState<boolean>(true);

	useEffect(() => {
		if (!clampRef.current?.scrollHeight && !clampRef.current?.clientHeight) {
			return;
		}

		const { scrollHeight, clientHeight } = clampRef.current;

		setShouldReadMore((2 * Math.abs(scrollHeight - clientHeight)) / (scrollHeight + clientHeight) > 0.1);
	}, []);

	return (
		<CardDescription className="flex flex-col font-ppneuebit">
			{!!host && <span className="text-2xl text-gray-300">Hosted by: {host}</span>}
			{!!description && (
				<span
					ref={clampRef}
					className={`overflow-hidden text-lg transition-all duration-500 ease-in-out`}
					style={{
						maxHeight: isClamped ? "3.0em" : (clampRef.current?.scrollHeight ?? "none"),
						opacity: isClamped ? 0.8 : 1,
					}}
				>
					{description}
				</span>
			)}
			{shouldReadMore && (
				<button
					onClick={() => setIsClamped(!isClamped)}
					className="w-fit justify-center self-start border-none text-lg text-accent-foreground"
				>
					{isClamped ? "Read more..." : "Read less..."}
				</button>
			)}
		</CardDescription>
	);
}
