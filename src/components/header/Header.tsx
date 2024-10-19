"use client";

import { trpc } from "@/utils/client";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

export interface HeaderProps {
	children: React.ReactNode;
}

export default function Header(props: HeaderProps): React.ReactNode {
	const getAnnouncement = trpc.getAnnouncement.useQuery();
	const content = getAnnouncement.data?.content;
	const [bannerOpen, setBannerOpen] = useState<boolean>(true);
	const [scrollY, setScrollY] = useState<number>(0);

	// Track scroll position to hide banner on scroll
	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Banner is hidden once the user scrolls past 100px (adjust as needed)
	const isBannerVisible = bannerOpen && scrollY < 10;

	return (
		<>
			{content && (
				<div
					className={`grid w-full grid-cols-7 place-items-center bg-faded-neon-blue p-4 font-ppneuebit transition-all duration-500 ${
						isBannerVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
					}`}
				>
					<span className="col-start-2 col-end-7 text-wrap break-words text-center text-lg font-extrabold sm:text-2xl">
						{content}
					</span>
					<XIcon className="w-6 hover:cursor-pointer sm:w-10" onClick={() => setBannerOpen(false)} />
				</div>
			)}

			<section
				className={`fixed z-50 grid h-header w-screen items-center backdrop-blur-sm transition-all ${!isBannerVisible ? "top-0" : ""}`}
			>
				<nav className="ml-4 mr-4 flex h-full items-center justify-between">{props.children}</nav>
			</section>
		</>
	);
}
