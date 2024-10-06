"use client";

import { trpc } from "@/utils/client";
import { SheetValues } from "@/utils/google";
import { DataFrame } from "danfojs";

function scheduleToDataframe(schedule: SheetValues[]): DataFrame {
	const dataframe = new DataFrame(schedule);

	return dataframe;
}

export default function ScheduleTable(): React.ReactNode {
	const getSchedule = trpc.getSchedule.useQuery();

	return <div>{JSON.stringify(getSchedule.data, null, 4)}</div>;
}
