import path from "path";
import { createCaller } from "@/server/router";
import { httpBatchLink } from "@trpc/client";

export const serverClient = createCaller({
	links: [
		httpBatchLink({
			url: path.join(__dirname, "api", "trpc"),
		}),
	],
});
