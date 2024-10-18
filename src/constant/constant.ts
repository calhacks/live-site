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

export const [TEST_COUNTDOWN_START_TIMESTAMP, TEST_COUNTDOWN_END_TIMESTAMP]: [EpochTimeStamp, EpochTimeStamp] = [
	Date.now() + 5 * 1_000,
	Date.now() + 10 * 1_000,
];

// export const [COUNTDOWN_START_TIMESTAMP, COUNTDOWN_END_TIMESTAMP]: [EpochTimeStamp, EpochTimeStamp] = [
// 	Date.UTC(2024, 10, 18, 15),
// 	Date.UTC(2024, 10, 20, 11),
// ];

export interface FaqItem {
	question: string;
	response: string;
}

export const TWINKLE_STAR_DURATION_MS: number = 3_000;
