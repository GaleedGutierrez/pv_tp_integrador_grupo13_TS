import { MenuIcon, type MenuIconHandle } from '@ui/menu';
import type { JSX } from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';

import { appRoutes } from '@/routes/appRouters';

import { Navbar } from './Navbar';

/**
 * Header component
 * @returns The rendered header component with the navigation bar.
 */
export const Header = (): JSX.Element => {
	const menuIconReference = useRef<MenuIconHandle | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	/**
	 * This function checks if the menu is currently open or closed.
	 */
	const handleMenuToggle = (): void => {
		if (isMenuOpen) {
			menuIconReference.current?.stopAnimation();
		} else {
			menuIconReference.current?.startAnimation();
		}

		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="sticky inset-0 z-1 flex items-center justify-between gap-4 bg-white p-5 lg:justify-between lg:gap-10 lg:p-7">
			<div className="flex items-center gap-4 lg:justify-between lg:gap-10">
				<button
					aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
					className="h-7 w-7 lg:hidden"
					onClick={handleMenuToggle}
				>
					<MenuIcon
						ref={menuIconReference}
						className="h-7 w-7"
					/>
				</button>
				<Link
					className="font-heading text-2xl"
					to={appRoutes.home.index}
				>
					Shop.co
				</Link>
			</div>
			<Navbar isMenuOpen={isMenuOpen} />
			{/* <div className="flex items-center gap-3">
				<SearchIcon className="md:hidden" />
				<CartIcon />
				<UserIcon />
			</div> */}
		</header>
	);
};
