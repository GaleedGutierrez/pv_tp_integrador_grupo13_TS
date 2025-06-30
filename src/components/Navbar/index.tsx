import { type JSX } from 'react';

import { NavbarDesktop } from './components/NavbarDesktop';
import { NavbarMobile } from './components/NavbarMobile';

/**
 * This component renders a navigation bar with links to different sections of the application.
 * @returns The rendered component with routes and a not found page.
 * */
export const Navbar = (): JSX.Element => (
	<>
		<NavbarDesktop />
		<NavbarMobile />
	</>
);
