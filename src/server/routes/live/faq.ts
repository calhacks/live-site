import env from "@/utils/env";
import { readSpreadsheet, SheetValues } from "@/utils/google";
import logger from "@/utils/logger";
import { z } from "zod";

export async function queryFaq(): Promise<Faq[]> {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "FAQ!A1:C30");

	sheetValues?.shift();

	return (
		sheetValues?.reduce((faqs: Faq[], values: SheetValues) => {
			const category = values[0]?.toString();
			const question = values[1]?.toString();
			const answer = values[2]?.toString();

			const faq: Faq = {
				category: category,
				question: question,
				answer: answer,
			};

			const parsedFaq = faqSchema.safeParse(faq);
			if (!parsedFaq.success) {
				logger.error(parsedFaq, parsedFaq.error.message);
				return faqs;
			}

			faqs.push(parsedFaq.data);

			return faqs;
		}, []) ?? []
	);
}

export const faqSchema = z.object({
	category: z.string(),
	question: z.string(),
	answer: z.string(),
});

export type Faq = z.infer<typeof faqSchema>;
