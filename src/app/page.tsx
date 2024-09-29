"use client";

import Countdown from "@/components/countdown/Countdown";
import TwinkleStars from "@/components/twinkle/TwinkleStars";
import { TEST_COUNTDOWN_END_TIMESTAMP, TEST_COUNTDOWN_START_TIMESTAMP } from "@/constants/header";

export default function Home() {
	return (
		<main className="h-screen w-screen">
			<TwinkleStars maximumStars={5} twinkleLengthMilliseconds={3_000}>
				<Countdown
					countdownStart={TEST_COUNTDOWN_START_TIMESTAMP}
					countdownEnd={TEST_COUNTDOWN_END_TIMESTAMP}
				/>
			</TwinkleStars>
		</main>
	);
}
