"use client";

import { trpc } from "@/utils/client";

export default function Prizes(): React.ReactNode {
	const getPrizes = trpc.getPrizes.useQuery();

	return <div>{JSON.stringify(getPrizes.data)}</div>;
}
