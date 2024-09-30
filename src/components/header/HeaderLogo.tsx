"use client";

import CalHacksLogo from "@/assets/images/cal-hacks-11.png";
import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo(): React.ReactNode {
	return (
		<Link href="/">
			<Image className="w-32 sm:w-32 md:w-44 lg:w-52" src={CalHacksLogo} alt={"Cal Hacks 11.0 Logo"} />
		</Link>
	);
}
