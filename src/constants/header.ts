export interface LinkData {
	title: string;
	href: string;
}

export const HEADER_LINK_DATA: LinkData[] = [
	{
		title: "Devpost",
		href: "/devpost",
	},
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
		title: "Maps",
		href: "/maps",
	},
];

export const [TEST_COUNTDOWN_START_TIMESTAMP, TEST_COUNTDOWN_END_TIMESTAMP]: [EpochTimeStamp, EpochTimeStamp] = [
	Date.now() + 5 * 1_000,
	Date.now() + 10 * 1_000,
];

// export const [COUNTDOWN_START_TIMESTAMP, COUNTDOWN_END_TIMESTAMP]: [EpochTimeStamp, EpochTimeStamp] = [
// 	Date.UTC(2024, 10, 18, 15),
// 	Date.UTC(2024, 10, 20, 11),
// ];
