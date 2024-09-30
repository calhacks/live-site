"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import BlueStar from "@/assets/images/stars/blue-star.png";
import FullBlueStar from "@/assets/images/stars/full-blue-star.png";
import GreenStar from "@/assets/images/stars/green-star.png";
import FullGreenStar from "@/assets/images/stars/full-green-star.png";

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

function createStars(amount: number, screenWidth: number, screenHeight: number): Star[] {
	return Array.from({ length: amount }, () => {
		const [x, y] = randomPosition(screenWidth, screenHeight);
		const image: StaticImageData = starTypeToImageUrl(StarTypes[Math.floor(Math.random() * StarTypes.length)]);

		return {
			x: x.toString(),
			y: y.toString(),
			image,
		};
	});
}

export interface TwinkleStarsProps {
	maximumStars: number;
	twinkleLengthMilliseconds: number;

	children: React.ReactNode;
}

export default function TwinkleStars(props: TwinkleStarsProps): React.ReactNode {
	const resolution = useWindowSize();
	const [stars, setStars] = useState<Star[]>([]);

	useEffect(() => {
		function updateStars() {
			const starsAmount: number = 1 + Math.floor(Math.random() * props.maximumStars);
			setStars(
				createStars(
					starsAmount,
					resolution?.width ?? window.innerWidth,
					resolution?.height ?? window.innerHeight,
				),
			);
			setTimeout(updateStars, props.twinkleLengthMilliseconds);
		}
		updateStars();
	}, []);

	return (
		<div className="relative h-full w-full">
			{stars.map(({ x, y, image }, index) => (
				<Image
					src={image}
					key={`${x}-${y}-${index}`}
					alt={"Star"}
					style={{ top: `${y}px`, left: `${x}px` }}
					className="absolute -z-50 w-4 animate-fadeInAndOut"
				/>
			))}
			{props.children}
		</div>
	);
}

/* `getWindowDimensions`, `useWindowDimensions`
 * CREDIT: https://stackoverflow.com/a/36862446
 */
function useWindowSize() {
	const [windowSize, setWindowSize] = useState<{ width: number; height: number }>();

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowSize;
}
