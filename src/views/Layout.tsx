import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import type { JSX } from 'react';
import { Outlet } from 'react-router';

/**
 * This component serves as a base layout for the application, including a header and a main content area.
 * @returns The rendered layout component with a header and main content.
 */
export const Layout = (): JSX.Element => (
	<div className="flex min-h-screen flex-col justify-between">
		<Header />
		<main>
			<Outlet />
		</main>
		<Footer />
	</div>
);
