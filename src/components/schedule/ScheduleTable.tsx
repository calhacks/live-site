"use client";

import { trpc } from "@/utils/client";

export default function ScheduleTable(): React.ReactNode {
	const getSchedule = trpc.getSchedule.useQuery();

	return <div>{JSON.stringify(getSchedule.data, null, 4)}</div>;
}
