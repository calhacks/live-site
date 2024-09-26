"use client";

import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import HamburgerMenu from "./HamburgerMenu";

export interface HeaderLinksProps {
	children: React.ReactNode;
}

export default function HeaderLinks(props: HeaderLinksProps): React.ReactNode {
	return (
		<section>
			<HamburgerMenu className="sm:hidden">{props.children}</HamburgerMenu>
			<NavigationMenu className="hidden sm:block">
				<NavigationMenuList>{props.children}</NavigationMenuList>
			</NavigationMenu>
		</section>
	);
}
