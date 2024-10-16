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
	return (
		<main className="w-screen">
			<div className="w-full">
				<div className="grid h-dvh w-full place-items-center overflow-hidden">
					<TwinkleStars maximumStars={5} />
					<Countdown
						countdownStart={TEST_COUNTDOWN_START_TIMESTAMP}
						countdownEnd={TEST_COUNTDOWN_END_TIMESTAMP}
					/>
				</div>
				<div className="flex w-full justify-center">
					<ScheduleTable />
				</div>
			</div>
		</main>
	);
}
