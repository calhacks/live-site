import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

export const router = trpc.router;
export const procedure = trpc.procedure;

export const mergeRouters = trpc.mergeRouters;
export const createCallerFactory = trpc.createCallerFactory;
export const middleware = trpc.middleware;
