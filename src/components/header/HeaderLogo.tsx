"use client";

import HackathonsAtBerkeleyImage from "@/assets/images/hackathons-@-berkeley.png";
import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo(): React.ReactNode {
	return (
		<Link href="/">
			{/* <Image className="w-32 sm:w-40" src={HackathonsAtBerkeleyImage} alt={"Hackathons @ Berkeley Image"} /> */}
			<span className="text-lg font-extrabold">Hackathons @ Berkeley</span>
		</Link>
	);
}
