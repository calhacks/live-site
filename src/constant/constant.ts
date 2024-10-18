export interface LinkData {
	title: string;
	href: string;
	openInNewWindow?: boolean;
}

export const HEADER_LINK_DATA: LinkData[] = [
	{
		title: "FAQ",
		href: "/faq",
	},
	{
		title: "Prizes",
		href: "/prizes",
	},
	{
		title: "Resources",
		href: "/resources",
	},
	{
		title: "Map",
		href: "/map",
	},
	// {
	// 	title: "Devpost",
	// 	href: "https://devpost.com/",
	// 	openInNewWindow: true,
	// },
];

export const [COUNTDOWN_START_TIMESTAMP, COUNTDOWN_END_TIMESTAMP]: [EpochTimeStamp, EpochTimeStamp] = [
	1729296000000, 1729445400000,
];

export interface FaqItem {
	question: string;
	response: string;
}

export const TWINKLE_STAR_DURATION_MS: number = 3_000;
