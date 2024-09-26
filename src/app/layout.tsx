import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import HeaderLogo from "@/components/header/HeaderLogo";
import HeaderLinks from "@/components/header/HeaderLinks";
import { HEADER_LINK_DATA } from "@/constants/header";
import HeaderLink, { HeaderLinkProps } from "@/components/header/HeaderLink";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Cal Hacks 11.0",
	description:
		"Cal Hacks is the world's largest collegiate hackathon hosted at UC Berkeley. Together we'll assemble in SF for a weekend of hacking, friendship, and crazy ideas.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header>
					<HeaderLogo />
					<HeaderLinks>
						{HEADER_LINK_DATA.map((data: HeaderLinkProps) => (
							<HeaderLink {...data} />
						))}
					</HeaderLinks>
				</Header>
				{children}
			</body>
		</html>
	);
}
