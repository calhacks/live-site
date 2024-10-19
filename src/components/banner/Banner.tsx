"use client";

import { trpc } from "@/utils/client";
import { XIcon } from "lucide-react";
import { useState } from "react";

export default function Banner(): React.ReactNode {
	const getAnnouncement = trpc.getAnnouncement.useQuery();
	const content = getAnnouncement.data?.content;
	const [bannerOpen, setBannerOpen] = useState<boolean>(true);

	return content && bannerOpen ? (
		<div className={`grid w-full grid-cols-7 place-items-center bg-faded-neon-blue p-4 font-ppneuebit`}>
			<span className="col-start-2 col-end-7 text-wrap break-words text-center text-lg font-extrabold sm:text-2xl">
				{content}
			</span>
			<XIcon className="w-6 hover:cursor-pointer sm:w-10" onClick={() => setBannerOpen(false)} />
		</div>
	) : (
		<></>
	);
}
