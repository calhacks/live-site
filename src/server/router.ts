import { liveRouter } from "./routes/live/route";
import { createCallerFactory, mergeRouters } from "./trpc";

export const appRouter = mergeRouters(liveRouter);

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
