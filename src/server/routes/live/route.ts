import { procedure, router } from "../../trpc";
import { queryPrizes } from "./prize";

export const liveRouter = router({
	getPrizes: procedure.query(queryPrizes),
});
