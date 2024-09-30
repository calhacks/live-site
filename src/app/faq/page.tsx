import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_DATA, FaqItem } from "@/constants/header";

export default function Faq(): React.ReactNode {
	return (
		<main className="absolute top-[10%] grid h-screen w-screen place-items-center">
			<Accordion type="single" collapsible className="grid w-8/12 grid-cols-1 gap-2">
				{FAQ_DATA.map(({ question, response }: FaqItem) => {
					return (
						<AccordionItem value={question} key={question}>
							<AccordionTrigger className="text-left font-ppmondwest text-lg font-bold text-gray-400 focus:text-white">
								{question}
							</AccordionTrigger>
							<AccordionContent className="text-left font-ppneuebit text-lg">{response}</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</main>
	);
}
