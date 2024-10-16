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
	}[];
	filters: DayScheduleFilter[];
	setFilters: React.Dispatch<SetStateAction<DayScheduleFilter[]>>;
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
				{props.checkboxes.map(({ id, label, filter }) => (
					<div className="flex items-center space-x-2 p-1 text-base sm:text-xl" key={id}>
						<Checkbox
							id={id}
							checked={props.filters?.includes(filter)}
							onCheckedChange={(checked) => checkedSetFilters(checked, filter, props.setFilters)}
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
