import env from "@/utils/env";
import { z } from "zod";
import { readSpreadsheet, SheetValues } from "@/utils/google";

export const prizeSchema = z.object({
	category: z.string(),
	awardedBy: z.string(),
	prizeName: z.string(),
	prizeDescription: z.optional(z.string()),
	prizeUrl: z.optional(z.string()),
});

export type Prize = z.infer<typeof prizeSchema>;

export async function queryPrizes(): Promise<Prize[]> {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Prizes!A2:E");

	return (
		sheetValues?.reduce((accumulator: Prize[], values: SheetValues) => {
			const category = values[0]?.toString();
			const awardedBy = values[1]?.toString();
			const prizeName = values[2]?.toString();
			const prizeDescription = values[3]?.toString();
			const prizeUrl = values[4]?.toString();

			const prize: Prize = {
				category: category,
				awardedBy: awardedBy,
				prizeName: prizeName,
				prizeDescription: prizeDescription,
				prizeUrl: prizeUrl,
			};

			const parsedPrize = prizeSchema.safeParse(prize);
			if (!parsedPrize.success) {
				return accumulator;
			}

			accumulator.push(parsedPrize.data);
			return accumulator;
		}, []) ?? []
	);
}
