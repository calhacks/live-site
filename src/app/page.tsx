"use client";

import Countdown from "@/components/countdown/Countdown";
import ScheduleTable from "@/components/schedule/ScheduleTable";
import TwinkleStars from "@/components/twinkle/TwinkleStars";
import { COUNTDOWN_END_TIMESTAMP, COUNTDOWN_START_TIMESTAMP } from "@/constant/constant";
import { useEffect, useState } from "react";

const scrollToSchedule = () => {
	const scheduleSection = document.getElementById("schedule");
	if (scheduleSection) {
		scheduleSection.scrollIntoView({ behavior: "smooth" });
	}
};

export default function Home() {
	const [isButtonVisible, setIsButtonVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsButtonVisible(false);
			} else {
				setIsButtonVisible(true);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<main className="w-screen">
			<div className="w-full">
				<div className="grid h-dvh w-full place-items-center overflow-hidden">
					<TwinkleStars maximumStars={5} />
					<Countdown countdownStart={COUNTDOWN_START_TIMESTAMP} countdownEnd={COUNTDOWN_END_TIMESTAMP} />
					<div
						id="schedule"
						className={`sm:bottom-8" absolute bottom-4 flex h-screen w-full items-end justify-center transition-all duration-300 ${
							isButtonVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
						}`}
					>
						<button
							onClick={scrollToSchedule}
							className="animate-bounce font-ppneuebit text-lg uppercase text-white focus:outline-none"
						>
							Scroll to see the schedule
						</button>
					</div>
				</div>
				<div className="flex w-full justify-center">
					<ScheduleTable />
				</div>
			</div>
		</main>
	);
}
