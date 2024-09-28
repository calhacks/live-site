"use client";

import { HEADER_LINK_DATA, LinkData } from "@/constants/header";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import HamburgerMenu from "./HamburgerMenu";

const links = HEADER_LINK_DATA.map(({ title, href }: LinkData) => (
	<NavigationMenuLink
		key={title}
		href={href}
		className="sm:group rounded-md text-2xl font-extrabold uppercase text-gray-100 transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 sm:inline-flex sm:px-4 sm:py-2 sm:text-sm sm:font-normal sm:capitalize sm:text-gray-400"
	>
		{title}
	</NavigationMenuLink>
));
navigationMenuTriggerStyle;

export default function HeaderLinks(): React.ReactNode {
	return (
		<section>
			<HamburgerMenu className="sm:hidden">{links}</HamburgerMenu>
			<NavigationMenu className="hidden sm:block">
				<NavigationMenuList className="mx-2">{links}</NavigationMenuList>
			</NavigationMenu>
		</section>
	);
}
