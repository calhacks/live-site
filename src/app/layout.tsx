import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header/Header";
import HeaderLogo from "@/components/header/HeaderLogo";
import HeaderLinks from "@/components/header/HeaderLinks";
import { ThemeProvider } from "next-themes";

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
		/*  NOTE: Hydration warning due to `ThemeProvider` is SAFE and EXPECTED BEHAVIOR which is why they are surpressed.
		 *  READ: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-pages
		 *  > Note that `ThemeProvider` is a client component, not a server component.
		 *  > Note! If you do not add suppressHydrationWarning to your <html> you will get warnings because next-themes updates that element. This property only applies one level deep, so it won't block hydration warnings on other elements.
		 */
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
					<Header>
						<HeaderLogo />
						<HeaderLinks />
					</Header>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
