"use client";

import path from "path";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "./client";
import { httpBatchLink } from "@trpc/client";

export default function TRPCProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient({}));
	const [trpcClient] = useState(() => {
		return trpc.createClient({
			links: [
				httpBatchLink({
					url: path.join(__dirname, "api", "trpc"),
				}),
			],
		});
	});

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
