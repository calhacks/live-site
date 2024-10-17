"use client";

import Spaceship from "@/components/spaceship/Spaceship";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Prize } from "@/server/routes/live/prize";
import { trpc } from "@/utils/client";

export default function Prizes(): React.ReactNode {
	const getPrizes = trpc.getPrizes.useQuery();

	return (
		<>
			<main className="pt-header h-auto w-screen">
				<Spaceship className="invisible sm:visible" />
				<div className="grid w-full grid-cols-1 place-items-center gap-y-4 sm:grid-flow-row sm:grid-cols-3 sm:gap-y-8">
					{getPrizes.data?.map((prize: Prize) => <PrizeCard key={prize.category} {...prize} />)}
				</div>
			</main>
		</>
	);
}

function PrizeCard({ category, awardedBy, prizeDescription }: Prize): React.ReactNode {
	return (
		<Card className="hover:shadow-neon-blue w-4/5 bg-transparent duration-200 hover:shadow-md sm:w-4/5">
			<CardHeader className="p-4">
				<CardTitle className="font-ppmondwest text-lg">
					<span className="font-extrabold">{awardedBy}: </span>
					<span>{category}</span>
				</CardTitle>
				<CardDescription className="font-ppneuebit">
					<span className="text-lg">{prizeDescription}</span>
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
