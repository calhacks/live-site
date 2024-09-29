"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import BlueStar from "@/assets/images/stars/blue-star.png";
import FullBlueStar from "@/assets/images/stars/full-blue-star.png";
import GreenStar from "@/assets/images/stars/green-star.png";
import FullGreenStar from "@/assets/images/stars/full-green-star.png";
import { useWindowDimensions } from "@/lib/utils";

export const StarTypes = ["blue", "full-blue", "green", "full-green"] as const;

export interface Star {
	x: string;
	y: string;
	image: StaticImageData;
}

function randomPosition(resolutionWidth: number, resolutionHeight: number): [number, number] {
	/*
	 * Magic numbers explanation:
	 * To prevent the position being along the edges of the screen (which causes scrolling), offset the resolution by `100px` and then add a smaller offset of `50px`.
	 */
	return [
		25 + Math.floor(Math.random() * (resolutionWidth - 50)),
		25 + Math.floor(Math.random() * (resolutionHeight - 50)),
	];
}

function starTypeToImageUrl(type: (typeof StarTypes)[number]): StaticImageData {
	switch (type) {
		case "blue":
			return BlueStar;
		case "full-blue":
			return FullBlueStar;
		case "green":
			return GreenStar;
		case "full-green":
			return FullGreenStar;
	}
}

export interface TwinkleStarsProps<T extends number> {
	maximumStars: number;
	twinkleLengthMilliseconds: number;

	children: React.ReactNode;
}

export default function TwinkleStars<T extends number>(
	props: React.PropsWithChildren<TwinkleStarsProps<T>>,
): React.ReactNode {
	const { height, width } = useWindowDimensions();
	const [stars, setStars] = useState<Star[]>([]);

	useEffect(() => {
		const starsAmount: number = 1 + Math.floor(Math.random() * props.maximumStars);

		let newStars: Star[] = [];
		for (let _ = 0; _ < starsAmount; ++_) {
			const [x, y] = randomPosition(width, height);
			const image: StaticImageData = starTypeToImageUrl(StarTypes[Math.floor(Math.random() * StarTypes.length)]);

			newStars.push({
				x: x.toString(),
				y: y.toString(),
				image,
			});
		}

		setStars(newStars);

		const createStarsInterval = setInterval(() => {
			const starsAmount: number = 1 + Math.floor(Math.random() * props.maximumStars);
			let newStars: Star[] = [];
			for (let _ = 0; _ < starsAmount; ++_) {
				const [x, y]: [number, number] = randomPosition(width, height);
				const image: StaticImageData = starTypeToImageUrl(
					StarTypes[Math.floor(Math.random() * StarTypes.length)],
				);

				newStars.push({
					x: Math.floor(x).toString(),
					y: Math.floor(y).toString(),
					image,
				});
			}

			setStars(newStars);
		}, props.twinkleLengthMilliseconds);

		return () => clearInterval(createStarsInterval);
	}, []);

	return (
		<div className="relative h-full w-full">
			{stars.map(({ x, y, image }, index) => (
				<Image
					src={image}
					key={`${x}-${y}-${index}`}
					alt={"Star"}
					style={{ top: `${y}px`, left: `${x}px` }}
					className="animate-fadeInAndOut absolute -z-50 w-4"
				/>
			))}
			{props.children}
		</div>
	);
}
