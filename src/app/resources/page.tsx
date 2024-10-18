"use client";

import Agora from "@/assets/images/sponsors/Agora.png";
import Arize from "@/assets/images/sponsors/Arize.png";
import Cartesia from "@/assets/images/sponsors/Cartesia.png";
import Chroma from "@/assets/images/sponsors/Chroma.png";
import Deepgram from "@/assets/images/sponsors/Deepgram.png";
import FetchAi from "@/assets/images/sponsors/FetchAi.png";
import Google from "@/assets/images/sponsors/Google.png";
import Groq from "@/assets/images/sponsors/Groq.png";
import Hume from "@/assets/images/sponsors/Hume.png";
import Hyperbolic from "@/assets/images/sponsors/Hyperbolic.png";
import InteractionCompany from "@/assets/images/sponsors/InteractionCompany.png";
import Reflex from "@/assets/images/sponsors/Reflex.png";
import Ripple from "@/assets/images/sponsors/Ripple.png";
import SingleStore from "@/assets/images/sponsors/SingleStore.png";
import Skylo from "@/assets/images/sponsors/Skylo.png";
import Sui from "@/assets/images/sponsors/Sui.png";
import Vapi from "@/assets/images/sponsors/Vapi.png";
import Warp from "@/assets/images/sponsors/Warp.png";
import Spaceship from "@/components/spaceship/Spaceship";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/utils/client";
import Image, { StaticImageData } from "next/image";

const categoryImageMap: Record<string, StaticImageData> = {
	"Fetch.ai": FetchAi,
	Google: Google,
	Hume: Hume,
	Sui: Sui,
	SingleStore: SingleStore,
	Groq: Groq,
	Skylo: Skylo,
	Hyperbolic: Hyperbolic,
	Ripple: Ripple,
	Cartesia: Cartesia,
	Deepgram: Deepgram,
	"Interaction Company": InteractionCompany,
	"Arize AI": Arize,
	Vapi: Vapi,
	Agora: Agora,
	Chroma: Chroma,
	"Reflex.dev": Reflex,
	Warp: Warp,
};

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

function ResourceCard({ name, url }: { name: string; url?: string }): React.ReactNode {
	const companyImage = categoryImageMap[name] ?? null;
	const darkLogos = ["Hume", "Ripple", "Cartesia", "Deepgram", "Agora", "Chroma"];

	return (
		<Card className="hover:shadow-neon-green w-4/5 bg-transparent duration-200 hover:shadow-md hover:backdrop-blur-sm sm:w-4/5">
			<CardHeader className="p-4">
				{companyImage && (
					<div className="mb-4 flex justify-center">
						<Image
							src={companyImage}
							alt={`${name} Logo`}
							className={`h-20 w-20 object-contain ${darkLogos.includes(name) ? "rounded bg-white p-2" : ""}`}
						/>
					</div>
				)}

				<Mobile>
					<a href={url ?? "#"} target="_blank" rel="noopener noreferrer">
						<CardTitle className="grid justify-items-center font-ppmondwest text-xl leading-normal underline">
							<span className="text-center font-extrabold">{name}</span>
						</CardTitle>
					</a>
				</Mobile>

				<Desktop>
					<a href={url ?? "#"} target="_blank" rel="noopener noreferrer">
						<CardTitle className="grid justify-items-center font-ppmondwest text-2xl leading-normal underline">
							<span className="font-extrabold">{name}</span>
						</CardTitle>
					</a>
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
