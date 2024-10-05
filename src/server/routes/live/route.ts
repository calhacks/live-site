import { procedure, router } from "../../trpc";
import { queryPrizes } from "./prize";
import querySchedule from "./schedule";

export const liveRouter = router({
	getPrizes: procedure.query(queryPrizes),
	getSchedule: procedure.query(querySchedule),
});
