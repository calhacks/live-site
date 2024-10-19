import { procedure, router } from "../../trpc";
import { queryPrizes } from "./prize";
import { querySchedule } from "./schedule";
import { queryResources } from "./resources";
import { queryFaq } from "./faq";
import { queryAnnouncement } from "./announcement";

export const liveRouter = router({
	getPrizes: procedure.query(queryPrizes),
	getSchedule: procedure.query(querySchedule),
	getResources: procedure.query(queryResources),
	getFaq: procedure.query(queryFaq),
	getAnnouncement: procedure.query(queryAnnouncement),
});
