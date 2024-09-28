"use client";

import { MenuIcon, XIcon } from "lucide-react";
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
			<SheetContent side="right" className="w-full">
				<SheetClose>
					<Button variant="ghost" size="icon">
						<XIcon className="h-6 w-6"></XIcon>
					</Button>
				</SheetClose>
				<NavigationMenu
					className="mt-20 flex h-screen max-w-full items-start justify-center"
					orientation="vertical"
				>
					<NavigationMenuList className="flex w-full flex-col items-center justify-start gap-y-6">
						{React.Children.map(props.children, (child) => (
							<SheetClose asChild>{child}</SheetClose>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</SheetContent>
		</Sheet>
	);
}
