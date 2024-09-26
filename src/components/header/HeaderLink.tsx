"use client";

import Link from "next/link";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "../ui/navigation-menu";

export interface HeaderLinkProps {
	title: string;
	href: string;
	scroll: boolean;
}

export default function HeaderLink(props: HeaderLinkProps): React.ReactNode {
	return (
		<NavigationMenuItem>
			<Link href={props.href} scroll={props.scroll} legacyBehavior passHref>
				<NavigationMenuLink
					className={`text-foreground/60 transition-colors hover:bg-transparent hover:text-foreground/80 focus:bg-transparent ${navigationMenuTriggerStyle()}`}
				>
					{props.title}
				</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	);
}
