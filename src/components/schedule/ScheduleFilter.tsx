import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface ScheduleFilterProps {
	checkboxes: {
		id: string;
		label: string;
	}[];
}

export default function ScheduleFilter(props: ScheduleFilterProps): React.ReactNode {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="w-fit border-accent bg-transparent font-ppmondwest text-sm font-semibold text-foreground sm:text-lg"
				>
					Filters
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full font-ppneuebit text-lg">
				{props.checkboxes.map(({ id, label }) => (
					<div className="flex items-center space-x-2 text-base sm:text-xl" key={id}>
						<Checkbox id={id} />
						<label htmlFor={id}>{label}</label>
					</div>
				))}
			</PopoverContent>
		</Popover>
	);
}
