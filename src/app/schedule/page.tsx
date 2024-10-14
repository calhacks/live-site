"use client";

import ScheduleTable from "@/components/schedule/ScheduleTable";

export default function Schedule(): React.ReactNode {
	return (
		<main className="flex h-auto w-screen justify-center">
			<div className="mt-header">
				<ScheduleTable />
			</div>
		</main>
	);
}
