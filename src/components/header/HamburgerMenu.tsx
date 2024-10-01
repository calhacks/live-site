"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
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
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="grid h-full w-full place-items-center">
				<SheetHeader className="h-full w-full">
					<SheetTitle className="invisible"></SheetTitle> {/* Linter warning */}
					<SheetDescription className="invisible"></SheetDescription> {/* Linter warning */}
					<SheetClose asChild>
						<Button className="absolute" variant="ghost" size="icon">
							<XIcon />
						</Button>
					</SheetClose>
					<section className="flex h-full max-w-full items-start justify-center">
						<nav className="flex h-full w-full flex-col items-center justify-center gap-y-6">
							{props.children}
						</nav>
					</section>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
