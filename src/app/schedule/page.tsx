"use client";

import { trpc } from "@/utils/client";
import { DataFrame } from "danfojs";

export default function Schedule(): React.ReactNode {
	const getSchedule = trpc.getSchedule.useQuery();

	return <div>{new DataFrame(getSchedule.data).toString()}</div>;
}
