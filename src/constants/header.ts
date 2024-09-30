export interface LinkData {
	title: string;
	href: string;
	openInNewWindow?: boolean;
}

export const HEADER_LINK_DATA: LinkData[] = [
	{
		title: "Countdown",
		href: "/",
	},
	{
		title: "Devpost",
		href: "https://devpost.com/",
		openInNewWindow: true,
	},
	{
		title: "FAQ",
		href: "/faq",
	},
	// {
	// 	title: "Prizes",
	// 	href: "/prizes",
	// },
	{
		title: "Resources",
		href: "/resources",
	},
	{
		title: "Map",
		href: "/map",
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

export interface FaqItem {
	question: string;
	response: string;
}

export const FAQ_DATA: FaqItem[] = [
	{
		question: "What is a hackathon?",
		response:
			"Come alone or with a team. Build anything, from games to robot dogs to art projects to the next unicorn startup. We give you the tools, time and mentorship to do it.",
	},
	{
		question: "What is Cal Hacks?",
		response:
			"Cal Hacks is the largest collegiate hackathon in the world. Thousands of students. One giant room. 36 hours to build something amazing.",
	},
	{
		question: "When/where is Cal Hacks?",
		response: "Cal Hacks will be held October 18-20th, 2024, at the Metreon in the heart of San Francisco, CA",
	},
	{
		question: "Who can attend?",
		response:
			"Any current college student (including 2-year, undergraduate and graduate programs) over the age of 18 is welcome to attend Cal Hacks. We welcome students of all backgrounds and experience levels.",
	},
	{ question: "How do I apply?", response: "You can apply on our website at apply.hackberkeley.org." },
	{
		question: "Will Cal Hacks offer travel reimbursement?",
		response: "Unfortunately, we are unable to offer any travel reimbursements this year.",
	},
	{
		question: "Does applying mean I am accepted?",
		response:
			"No, applying does not guarantee acceptance. We will send out acceptance emails in the weeks leading up to the event. If you need a faster response, please let us know.",
	},
	{
		question: "Does everyone on my team need to apply?",
		response: "Yes, everyone on your team needs to apply. You are admitted individually, not as a team.",
	},
	{
		question: "How much does it cost to attend?",
		response: "Cal Hacks is free for all attendees, thanks to our sponsors.",
	},
	{
		question: "How do I get to Cal Hacks?",
		response:
			"The venue is located a short walk from the Powell Street BART station. We recommend taking public transportation.",
	},
	{
		question: "What should I bring?",
		response:
			"You should bring your student ID, a laptop, chargers, personal hygiene supplies (deodorant, toothbrush) and any other materials you need to work on your project.",
	},
	{
		question: "Will there be space to sleep?",
		response:
			"Yes! We will have designated sleeping areas for attendees. You can also book a room at one of many nearby hotels.",
	},
	{
		question: "What if I don't have a team?",
		response:
			"You can still apply! We will have team formation events online and at the beginning of the hackathon.",
	},
	{ question: "How many people can be on a team?", response: "Teams can be up to 4 people." },
	{
		question: "What if I have never been to a hackathon before?",
		response: "That's okay! Cal Hacks is open to all skill levels, from beginners to experts.",
	},
];
