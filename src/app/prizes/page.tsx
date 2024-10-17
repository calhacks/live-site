"use client";

import Spaceship from "@/components/spaceship/Spaceship";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Prize } from "@/server/routes/live/prize";
import { trpc } from "@/utils/client";
import { useEffect, useRef, useState } from "react";

export default function Prizes(): React.ReactNode {
	const getPrizes = trpc.getPrizes.useQuery();

	return (
		<>
			<main className="grid h-auto w-screen pb-10 pt-header">
				<Spaceship className="invisible sm:visible" />
				<div className="md:4/5 grid w-full grid-cols-1 place-items-center gap-y-4 justify-self-center sm:w-11/12 sm:grid-flow-row sm:grid-cols-3 sm:gap-y-8">
					{getPrizes.data?.map((prize: Prize) => <PrizeCard key={prize.category} {...prize} />)}
				</div>
			</main>
		</>
	);
}

function PrizeCard({ category, awardedBy, prizeDescription }: Prize): React.ReactNode {
	return (
		<Card className="w-4/5 bg-transparent duration-200 hover:shadow-md hover:shadow-neon-blue hover:backdrop-blur-sm sm:w-4/5">
			<CardHeader className="p-4">
				<Mobile>
					<Drawer>
						{prizeDescription ? (
							<DrawerTrigger className="w-full text-left">
								<CardTitle
									className={`font-ppmondwest text-xl leading-normal ${prizeDescription ? "underline" : "no-underline"}`}
								>
									<span className="font-extrabold">{awardedBy}: </span>
									<span>{category}</span>
								</CardTitle>
							</DrawerTrigger>
						) : (
							<CardTitle
								className={`font-ppmondwest text-xl leading-normal ${prizeDescription ? "underline" : "no-underline"}`}
							>
								<span className="font-extrabold">{awardedBy}: </span>
								<span>{category}</span>
							</CardTitle>
						)}
						<DrawerContent>
							<DrawerHeader className="w-11/12 gap-y-2 place-self-center">
								<DrawerTitle className="font-ppmondwest leading-normal">
									<span className="font-extrabold">{awardedBy}: </span>
									<span>{category}</span>
								</DrawerTitle>
								{!!prizeDescription && (
									<DrawerDescription className="break-words break-all font-ppneuebit text-lg">
										{prizeDescription}
									</DrawerDescription>
								)}
							</DrawerHeader>
						</DrawerContent>
					</Drawer>

					{!!prizeDescription && <MobileDescription description={prizeDescription} />}
				</Mobile>

				<Desktop>
					<CardTitle className="font-ppmondwest text-2xl leading-normal">
						<span className="font-extrabold">{awardedBy}: </span>
						<span>{category}</span>
					</CardTitle>
					{!!prizeDescription && <DesktopDescription description={prizeDescription} />}
				</Desktop>
			</CardHeader>
		</Card>
	);
}

function Mobile({ children }: { children?: React.ReactNode }): React.ReactNode {
	return <div className="h-auto w-full break-words break-all sm:hidden">{children}</div>;
}

function Desktop({ children }: { children?: React.ReactNode }): React.ReactNode {
	return <div className="hidden break-words sm:block">{children}</div>;
}

function MobileDescription({ description }: { description?: string | undefined }): React.ReactNode {
	return (
		<CardDescription className="font-ppneuebit">
			{!!description && <span className="line-clamp-3 text-lg">{description}</span>}
		</CardDescription>
	);
}

function DesktopDescription({ description }: { description?: string }): React.ReactNode {
	const clampRef = useRef<HTMLSpanElement>(null);

	const [shouldReadMore, setShouldReadMore] = useState<boolean>(false);
	const [isClamped, setIsClamped] = useState<boolean>(true);

	useEffect(() => {
		if (!clampRef.current?.scrollHeight && !clampRef.current?.clientHeight) {
			return;
		}

		const { scrollHeight, clientHeight } = clampRef.current;

		setShouldReadMore((2 * Math.abs(scrollHeight - clientHeight)) / (scrollHeight + clientHeight) > 0.5);
	}, []);

	return (
		<CardDescription className="flex flex-col font-ppneuebit">
			{!!description && (
				<span
					ref={clampRef}
					className={`overflow-hidden text-xl transition-all duration-500 ease-in-out`}
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
