"use client";

import Countdown from "@/components/countdown/Countdown";
import TwinkleStars from "@/components/twinkle/TwinkleStars";
import {
	// COUNTDOWN_END_TIMESTAMP,
	// COUNTDOWN_START_TIMESTAMP,
	TEST_COUNTDOWN_END_TIMESTAMP,
	TEST_COUNTDOWN_START_TIMESTAMP,
} from "@/constants/header";

export default function Home() {
	return (
		<main className="h-screen w-screen">
			<TwinkleStars maximumStars={5}>
				<div className="grid h-full w-full place-items-center">
					<Countdown
						countdownStart={TEST_COUNTDOWN_START_TIMESTAMP}
						countdownEnd={TEST_COUNTDOWN_END_TIMESTAMP}
					/>
				</div>
			</TwinkleStars>
		</main>
	);
}
