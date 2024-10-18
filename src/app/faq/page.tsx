"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trpc } from "@/utils/client";

export default function Faq(): React.ReactNode {
	const getFaq = trpc.getFaq.useQuery();

	return (
		<main className="h-auto w-screen pb-20 pt-header">
			<div className="grid h-full w-full place-items-center">
				<Accordion type="single" collapsible className="grid w-2/3 grid-cols-1 gap-2 sm:w-1/2">
					{getFaq.data?.map(({ category, question, answer }) => {
						return (
							<AccordionItem value={question} key={question}>
								<AccordionTrigger className="text-left font-ppmondwest text-lg font-bold text-gray-400 focus:text-white">
									{`${category}: ${question}`}
								</AccordionTrigger>
								<AccordionContent className="text-left font-ppneuebit text-xl">
									{answer}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</div>
		</main>
	);
}
