"use client";

export interface HeaderProps {
	children: React.ReactNode;
}

export default function Header(props: HeaderProps): React.ReactNode {
	return (
		<section className="sticky h-auto w-screen">
			<nav className="ml-4 mr-4 flex items-center justify-between p-4 backdrop-blur-sm md:ml-20 md:mr-20">
				{props.children}
			</nav>
		</section>
	);
}
