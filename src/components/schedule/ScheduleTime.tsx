import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export interface ScheduleTimeProps {
	time: string;
}

export default function ScheduleTime(props: ScheduleTimeProps) {
	return (
		<div className="flex h-full w-24 flex-col items-center justify-start">
			<Badge className="px-3 py-0.5 font-ppneuebit text-lg">{props.time}</Badge>
			<Separator className="flex-grow" orientation="vertical" />
		</div>
	);
}
