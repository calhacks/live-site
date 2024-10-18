"use client";

import Spaceship from "@/components/spaceship/Spaceship";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/utils/client";

export default function Resources(): React.ReactNode {
	const getResources = trpc.getResources.useQuery();

	return (
		<>
			<main className="grid h-auto w-screen pb-10 pt-header">
				<Spaceship className="invisible sm:visible" />
				<div className="md:4/5 grid w-full grid-cols-1 place-items-center gap-y-4 justify-self-center sm:w-11/12 sm:grid-flow-row sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-3">
					{getResources.data?.map((resource) => <ResourceCard key={resource.name} {...resource} />)}
				</div>
			</main>
		</>
	);
}

function ResourceCard({ name, url }: { name: string; url?: string; imageUrl?: string }): React.ReactNode {
	return (
		<Card className="hover:shadow-neon-green w-4/5 bg-transparent duration-200 hover:shadow-md hover:backdrop-blur-sm sm:w-4/5">
			<CardHeader className="p-4">
				<Mobile>
					<a href={url ?? "#"} target="_blank" rel="noopener noreferrer">
						<CardTitle className="font-ppmondwest text-xl leading-normal underline">
							<span className="font-extrabold">{name}</span>
						</CardTitle>
					</a>
					<CardDescription className="font-ppneuebit">
						<span className="line-clamp-3 text-lg">
							<p className="text-accent-foreground">{name}</p>
						</span>
					</CardDescription>
				</Mobile>

				<Desktop>
					<a href={url ?? "#"} target="_blank" rel="noopener noreferrer">
						<CardTitle className="font-ppmondwest text-2xl leading-normal underline">
							<span className="font-extrabold">{name}</span>
						</CardTitle>
					</a>
					<CardDescription className="flex flex-col font-ppneuebit">
						<span className="grid gap-y-2 overflow-hidden text-xl transition-all duration-500 ease-in-out">
							<p className="text-accent-foreground">{name}</p>
						</span>
					</CardDescription>
				</Desktop>
			</CardHeader>
		</Card>
	);
}

function Mobile({ children }: { children?: React.ReactNode }): React.ReactNode {
	return <div className="h-auto w-full break-words sm:hidden">{children}</div>;
}

function Desktop({ children }: { children?: React.ReactNode }): React.ReactNode {
	return <div className="hidden break-words sm:block">{children}</div>;
}
