import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import type { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router';

interface Properties {
	children: React.ReactNode;
}

/**
 * NotFoundPage component.
 * This component renders a simple "not found" page with a title and a message.
 * @returns The rendered component with routes and a not found page.
 * */
const NotFoundPage = (): JSX.Element => (
	<>
		<Header />
		<main className="flex h-dvh flex-col items-center justify-center gap-4">
			<h1 className="text-center">Ups! Página no encontrada</h1>
			<h2 className="text-center">Error 404</h2>
		</main>
		<Footer />
	</>
);

/**
 * RoutesWithNotFound component.
 * This component wraps the provided children routes and adds a catch-all route
 * that redirects to a "not found" page if no other routes match.
 * @param children - The child routes to render.
 * @returns The rendered component with routes and a not found page.
 * */
export const RoutesWithNotFound = ({ children }: Properties): JSX.Element => (
	<Routes>
		{children}

		<Route
			element={<NotFoundPage />}
			path="/404"
		/>
		<Route
			element={<Navigate to="/404" />}
			path="*"
		/>
	</Routes>
);
