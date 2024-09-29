"use client";

export interface HeaderProps {
	children: React.ReactNode;
}

export default function Header(props: HeaderProps): React.ReactNode {
	return (
		<section className="fixed h-auto w-screen backdrop-blur-sm">
			<nav className="ml-4 mr-4 flex items-center justify-between p-4 md:ml-20 md:mr-20">{props.children}</nav>
		</section>
	);
}
