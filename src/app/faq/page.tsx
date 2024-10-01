import TwinkleStars from "@/components/twinkle/TwinkleStars";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_DATA, FaqItem } from "@/constants/header";

export default function Faq(): React.ReactNode {
	return (
		<main className="h-dvh w-dvw">
			<TwinkleStars maximumStars={5}>
				<div className="grid h-full w-full place-items-center">
					<Accordion
						type="single"
						collapsible
						className="absolute top-[--header-height] grid w-2/3 grid-cols-1 gap-2"
					>
						{FAQ_DATA.map(({ question, response }: FaqItem) => {
							return (
								<AccordionItem value={question} key={question}>
									<AccordionTrigger className="text-left font-ppmondwest text-lg font-bold text-gray-400 focus:text-white">
										{question}
									</AccordionTrigger>
									<AccordionContent className="text-left font-ppneuebit text-lg">
										{response}
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</TwinkleStars>
		</main>
	);
}
