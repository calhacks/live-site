"use client";

import Countdown from "@/components/countdown/Countdown";
import ScheduleTable from "@/components/schedule/ScheduleTable";
import TwinkleStars from "@/components/twinkle/TwinkleStars";
import {
	// COUNTDOWN_END_TIMESTAMP,
	// COUNTDOWN_START_TIMESTAMP,
	TEST_COUNTDOWN_END_TIMESTAMP,
	TEST_COUNTDOWN_START_TIMESTAMP,
} from "@/constant/constant";

export default function Home() {
	const scrollToSchedule = () => {
		const scheduleSection = document.getElementById("schedule");
		if (scheduleSection) {
			scheduleSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<main className="w-screen">
			<div className="w-full">
				<div className="grid h-dvh w-full place-items-center overflow-hidden">
					<TwinkleStars maximumStars={5} />
					<Countdown
						countdownStart={TEST_COUNTDOWN_START_TIMESTAMP}
						countdownEnd={TEST_COUNTDOWN_END_TIMESTAMP}
					/>
					<div className="absolute bottom-4 flex items-center justify-center sm:bottom-8" id="schedule">
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
