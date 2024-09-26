"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import React from "react";

export interface HamburgerMenuProps {
	children: React.ReactNode;
	className?: string;
}

export default function HamburgerMenu(props: HamburgerMenuProps): React.ReactNode {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className={props.className} variant="ghost" size="icon">
					<MenuIcon className="h-6 w-6"></MenuIcon>
				</Button>
			</SheetTrigger>
			<SheetContent side="right">
				<NavigationMenu className="flex max-w-full">
					<NavigationMenuList className="flex w-full flex-col items-center justify-center">
						{React.Children.map(props.children, (child) => (
							<SheetClose asChild>{child}</SheetClose>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</SheetContent>
		</Sheet>
	);
}
