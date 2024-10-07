"use client";

import { trpc } from "@/utils/client";

export default function Resources(): React.ReactNode {
	const getResources = trpc.getResources.useQuery();

	return <div>{JSON.stringify(getResources.data)}</div>;
}
