"use client";

export interface HeaderProps {
	children: React.ReactNode;
}

export default function Header(props: HeaderProps): React.ReactNode {
	return (
		<section className="h-header fixed z-50 grid w-screen items-center backdrop-blur-sm">
			<nav className="ml-4 mr-4 flex h-full items-center justify-between">{props.children}</nav>
		</section>
	);
}
