"use client";

import { useEffect, useState } from "react";

function formatTimestamp(timestamp: EpochTimeStamp): string {
	const [hours, minutes, seconds] = [
		Math.floor((timestamp / (1_000 * 60 * 60)) % 24),
		Math.floor((timestamp / (1_000 * 60)) % 60),
		Math.floor((timestamp / 1_000) % 24),
	];

	const formattedTime = [hours, minutes, seconds].map((time: number) => time.toString().padStart(2, "0"));

	return formattedTime.join(":");
}

function correctCountdown(
	currentTime: EpochTimeStamp,
	countdownStart: EpochTimeStamp,
	countdownEnd: EpochTimeStamp,
): EpochTimeStamp {
	if (currentTime < countdownStart) {
		return countdownEnd - countdownStart;
	}
	if (currentTime >= countdownEnd) {
		return 0;
	}
	return countdownEnd - currentTime;
}

function countdownTitle(
	currentTime: EpochTimeStamp,
	countdownStart: EpochTimeStamp,
	countdownEnd: EpochTimeStamp,
): string {
	if (currentTime < countdownStart) {
		return "The hackathon is yet to begin...";
	}
	if (currentTime >= countdownEnd) {
		return "Thank you for joining Cal Hacks 11.0!";
	}
	return "Countdown until submission!";
}

export interface CountdownProps {
	countdownStart: EpochTimeStamp;
	countdownEnd: EpochTimeStamp;
}

export default function Countdown(props: Readonly<CountdownProps>): React.ReactNode {
	const { countdownStart, countdownEnd } = props;

	const [currentTime, setCurrentTime] = useState<EpochTimeStamp>();
	const [countdownTime, setCountdownTime] = useState<EpochTimeStamp>();

	const [title, setTitle] = useState<string>();
	const [formattedCountdown, setFormattedCountdown] = useState<string>();

	useEffect(() => {
		function updateTimestamps() {
			setCurrentTime(Date.now());
			setCountdownTime(correctCountdown(currentTime ?? Date.now(), countdownStart, countdownEnd));

			setTitle(countdownTitle(currentTime ?? Date.now(), countdownStart, countdownEnd));
			setFormattedCountdown(
				formatTimestamp(countdownTime ?? correctCountdown(Date.now(), countdownStart, countdownEnd)),
			);

			setTimeout(updateTimestamps, 1_000);
		}
		updateTimestamps();
	}, []);

	return (
		<div className="grid h-full w-full grid-cols-1 grid-rows-3">
			<div className="flex items-end justify-center font-ppmondwest text-xl sm:text-3xl">
				<span className="backdrop-blur-sm">{title}</span>
			</div>
			<div className="grid place-items-center font-ppneuebit text-8xl sm:text-9xl">
				<span className="backdrop-blur-sm">{formattedCountdown}</span>
			</div>
		</div>
	);
}
