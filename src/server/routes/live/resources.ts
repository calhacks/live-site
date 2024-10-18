import env from "@/utils/env";
import { readSpreadsheet, SheetValues } from "@/utils/google";
import logger from "@/utils/logger";
import { z } from "zod";

export async function queryResources(): Promise<Resource[]> {
	const { sheetValues } = await readSpreadsheet(env.SPREADSHEET_ID, "Sponsor & Workshop Starter Packs!A1:D30");

	sheetValues?.shift();

	return (
		sheetValues?.reduce((resources: Resource[], values: SheetValues) => {
			const category = values[0]?.toString();
			const packName = values[1]?.toString();
			const url = values[2]?.toString();
			const imageUrl = values[3]?.toString();

			const resource: Resource = {
				category: category,
				name: packName,
				url: url,
				imageUrl: imageUrl,
			};

			const parsedResource = resourceSchema.safeParse(resource);
			if (!parsedResource.success) {
				logger.error(parsedResource, parsedResource.error.message);
				return resources;
			}

			resources.push(parsedResource.data);

			return resources;
		}, []) ?? []
	);
}

export const resourceSchema = z.object({
	category: z.optional(z.string()),
	name: z.string(),
	url: z.optional(z.string()),
	imageUrl: z.optional(z.string()),
});

export type Resource = z.infer<typeof resourceSchema>;
