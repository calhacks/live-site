import env from "../../env";
import { z } from "zod";
import { readSpreadsheet, SheetValues } from "@/utils/google";
import logger from "@/utils/logger";

const prizeSchema = z.object({
	category: z.string(),
	awardedBy: z.string(),
	prizeDescription: z.string(),
	url: z.optional(z.string().url()),
});

type Prize = z.infer<typeof prizeSchema>;

export async function queryPrizes(): Promise<Prize[]> {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Prizes!A2:E");

	logger.info(sheetValues);

	return (
		sheetValues?.reduce((accumulator: Prize[], values: SheetValues) => {
			const category = values[0]?.toString();
			const awardedBy = values[1]?.toString();
			const prizeDescription = values[2]?.toString();
			const url = values[3]?.toString();

			const prize: Prize = {
				category: category,
				awardedBy: awardedBy,
				prizeDescription: prizeDescription,
				url: url,
			};

			const parsedPrize = prizeSchema.safeParse(prize);
			if (!parsedPrize.success) {
				logger.error(parsedPrize.data, parsedPrize.error.message);
				return accumulator;
			}

			accumulator.push(parsedPrize.data);
			return accumulator;
		}, []) ?? []
	);
}
