import SpaceshipImage from "@/assets/images/spaceship.png";
import BlueStarImage from "@/assets/images/stars/blue-star.png";
import FullBlueStarImage from "@/assets/images/stars/full-blue-star.png";
import FullGreenStarImage from "@/assets/images/stars/full-green-star.png";
import GreenStarImage from "@/assets/images/stars/green-star.png";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

export interface SpaceshipProps {
	starGasBounds?: [number, number];
	gasLengthMs?: number;
	maxStarsOnScreen?: number;

	className?: string;
}

export default function Spaceship({
	starGasBounds,
	gasLengthMs,
	maxStarsOnScreen,
	className,
}: SpaceshipProps): React.ReactNode {
	const spaceshipRef = useRef<HTMLImageElement | null>(null);
	const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [spaceshipPosition, setSpaceshipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [rotation, setRotation] = useState<number>(0);

	const [starGas, setStarGas] = useState<JSX.Element[]>([]);

	useEffect(() => {
		function handleMouseMove(event: MouseEvent) {
			setCursorPosition({ x: event.clientX, y: event.clientY });
		}
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	useEffect(() => {
		function createStarGas() {
			starGasBounds = starGasBounds ?? [5, 15];
			gasLengthMs = gasLengthMs ?? 100;
			maxStarsOnScreen = maxStarsOnScreen ?? 50;

			if (starGas.length >= maxStarsOnScreen) {
				return;
			}
			if (!spaceshipRef.current) {
				return;
			}

			const spaceshipBounding: DOMRect = spaceshipRef.current.getBoundingClientRect();

			const scrollX: number = window.scrollX;
			const scrollY: number = window.scrollY;

			const spaceshipX: number = spaceshipBounding.left + spaceshipBounding.width / 2 + scrollX;
			const spaceshipY: number = spaceshipBounding.top + spaceshipBounding.height / 2 + scrollY;

			const spaceshipHeight = spaceshipBounding.height / 2;
			const radians = rotation * (Math.PI / 180);
			const exhaustX = spaceshipX - spaceshipHeight * Math.sin(radians);
			const exhaustY = spaceshipY + spaceshipHeight * Math.cos(radians);

			const inclusiveRandomInteger = (minimum: number, maximum: number): number =>
				Math.floor(Math.random() * (maximum + 1 - minimum)) + minimum;

			const [minimumStars, maximumStars]: [number, number] = [...starGasBounds];
			const randomStarAmount: number = inclusiveRandomInteger(minimumStars, maximumStars);

			const starImages = [BlueStarImage, FullBlueStarImage, GreenStarImage, FullGreenStarImage];

			const newStarGas = Array.from({ length: randomStarAmount }, () => {
				const starImage: StaticImageData = starImages[Math.floor(Math.random() * starImages.length)];
				const x: number = exhaustX + inclusiveRandomInteger(-5, 5);
				const y: number = exhaustY + inclusiveRandomInteger(-5, 5);

				return (
					<Image
						src={starImage}
						key={`${x}-${y}-${Math.random()}`}
						alt={"star gas"}
						className={className}
						style={{ position: "absolute", left: x, top: y, width: "15px", zIndex: -50 }}
					/>
				);
			});

			setStarGas((previousStarGas: JSX.Element[]) => {
				const updatedStarGas = [...previousStarGas, ...newStarGas];

				setTimeout(() => {
					setStarGas((currentStarGas) => currentStarGas.slice(0, currentStarGas.length - newStarGas.length));
				}, gasLengthMs);

				return updatedStarGas;
			});
		}

		function moveSpaceship() {
			if (spaceshipRef.current) {
				const spaceshipBounding: DOMRect = spaceshipRef.current.getBoundingClientRect();
				const spaceshipX: number = spaceshipBounding.left + spaceshipBounding.width / 2;
				const spaceshipY: number = spaceshipBounding.top + spaceshipBounding.height / 2;

				const dx: number = cursorPosition.x - spaceshipX;
				const dy: number = cursorPosition.y - spaceshipY;
				const angle: number = Math.atan2(dy, dx);

				setRotation((angle * 180) / Math.PI + 90);

				setSpaceshipPosition({ x: cursorPosition.x, y: cursorPosition.y });

				spaceshipRef.current.animate(
					{
						left: `${spaceshipPosition.x}px`,
						top: `${spaceshipPosition.y}px`,
					},
					{ duration: 5_000, fill: "forwards" },
				);
			}
		}

		createStarGas();
		moveSpaceship();
	}, [cursorPosition]);

	return (
		<>
			<Image
				src={SpaceshipImage}
				alt="spaceship"
				ref={spaceshipRef}
				className={`fixed left-1/2 top-1/2 -z-50 ${className}`}
				style={{ transform: `rotate(${rotation}deg)` }}
				width={48}
			/>
			{starGas}
		</>
	);
}
