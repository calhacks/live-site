"use client";

import { HEADER_LINK_DATA, LinkData } from "@/constants/header";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";

const createLinks = ({ isMobile }: { isMobile: boolean }) => {
	return HEADER_LINK_DATA.map(({ title, href }: LinkData) => {
		const linkContent = (
			<NavigationMenuLink className="sm:group rounded-md font-ppmondwest text-2xl font-extrabold uppercase text-gray-100 transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 sm:inline-flex sm:px-2 sm:py-2 sm:text-lg sm:font-normal sm:capitalize sm:text-gray-400">
				{title}
			</NavigationMenuLink>
		);

		return (
			<Link key={title} href={href} passHref legacyBehavior>
				{isMobile ? <SheetClose asChild>{linkContent}</SheetClose> : linkContent}
			</Link>
		);
	});
};

export default function HeaderLinks(): React.ReactNode {
	return (
		<section>
			<HamburgerMenu className="sm:hidden">{createLinks({ isMobile: true })}</HamburgerMenu>
			<NavigationMenu className="hidden sm:block">
				<NavigationMenuList className="mx-2">{createLinks({ isMobile: false })}</NavigationMenuList>
			</NavigationMenu>
		</section>
	);
}
