import { SetStateAction } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DayScheduleFilter } from "./ScheduleTable";

export interface ScheduleFilterProps {
	checkboxes: {
		id: string;
		label: string;
		filter: DayScheduleFilter;
		className: string;
	}[];
	filters: DayScheduleFilter[];
	setFilters: React.Dispatch<SetStateAction<DayScheduleFilter[]>>;
}

export default function ScheduleFilter(props: ScheduleFilterProps): React.ReactNode {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="w-fit justify-self-end border-2 border-accent bg-transparent p-0 px-3 py-1 font-ppmondwest text-sm font-semibold text-muted-foreground ring-offset-transparent hover:border-foreground hover:bg-transparent hover:text-foreground data-[state=open]:border-foreground data-[state=open]:text-foreground sm:text-lg">
					Filters
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="mt-2 w-full border-muted-foreground font-ppneuebit text-lg">
				{props.checkboxes.map(({ id, label, filter, className }) => (
					<div className="flex items-center space-x-2 p-1 text-base sm:text-xl" key={id}>
						<Checkbox
							id={id}
							checked={props.filters?.includes(filter)}
							onCheckedChange={(checked) => checkedSetFilters(checked, filter, props.setFilters)}
							className={`data-[state=checked]:text-transparent ${className}`}
						/>
						<label htmlFor={id}>{label}</label>
					</div>
				))}
			</PopoverContent>
		</Popover>
	);
}

function checkedSetFilters(
	checked: boolean | "indeterminate",
	filter: DayScheduleFilter,
	setFilters: React.Dispatch<SetStateAction<DayScheduleFilter[]>>,
) {
	if (checked === true) {
		setFilters((filters: DayScheduleFilter[]) => [filter, ...filters]);
	} else {
		setFilters((filters: DayScheduleFilter[]) => filters.filter((currentFilter) => currentFilter !== filter));
	}
}
