"use client";

import { trpc } from "@/utils/client";
import SpaceshipImage from "@/assets/images/spaceship.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Prizes(): React.ReactNode {
	const getPrizes = trpc.getPrizes.useQuery();

	return <Spaceship />;
	// return <div>{JSON.stringify(getPrizes.data)}</div>;
}

function PrizeContainer(): React.ReactNode {
	return <></>;
}

function Spaceship(): React.ReactNode {
	const spaceshipRef = useRef<HTMLImageElement | null>(null);
	const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [spaceshipPosition, setSpaceshipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [rotation, setRotation] = useState<number>(0);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setCursorPosition({ x: event.clientX, y: event.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	useEffect(() => {
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

		moveSpaceship();
	}, [cursorPosition]);

	return (
		<>
			<Image
				src={SpaceshipImage}
				alt="spaceship"
				ref={spaceshipRef}
				className="fixed left-1/2 top-1/2"
				style={{ transform: `rotate(${rotation}deg)` }}
				width={48}
			/>
		</>
	);
}
