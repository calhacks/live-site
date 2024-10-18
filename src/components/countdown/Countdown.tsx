"use client";

import { useEffect, useState } from "react";

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
		<div className="grid h-full w-full grid-flow-col grid-rows-5 overflow-hidden lg:grid-rows-3">
			<div className="row-start-2 flex items-end justify-center font-ppmondwest text-2xl sm:text-3xl md:text-3xl lg:row-start-1 lg:text-4xl">
				<span>{title}</span>
			</div>
			<div className="h-full w-full font-ppneuebit">
				<span className="flex h-full items-center justify-center text-[min(8rem,calc(100vh/6))] sm:text-[calc(100vh/5)] md:text-[calc(100vh/4)] lg:text-[min(35vw,calc(100vh/3))]">
					{formattedCountdown}
				</span>
			</div>
		</div>
	);
}

function formatTimestamp(timestamp: EpochTimeStamp): string {
	const totalSeconds = Math.floor(timestamp / 1_000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const formattedTime = [hours, minutes, seconds].map((time: number) => time.toString().padStart(2, "0"));

	return formattedTime.join(":");
}

function correctCountdown(
	currentTime: EpochTimeStamp,
	countdownStart: EpochTimeStamp,
	countdownEnd: EpochTimeStamp,
): EpochTimeStamp {
	if (currentTime < countdownStart) {
		return countdownStart - currentTime;
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
		return "Hacking will begin in...";
	}
	if (currentTime >= countdownEnd) {
		return "Thank you for joining Cal Hacks 11.0!";
	}
	return "Countdown until submission!";
}
