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
	<main>
		<h1 className="text-center">Ups! Página no encontrada</h1>
		<h2 className="text-center">Error 404</h2>
	</main>
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
			element={<Navigate to="/404" />}
			path="*"
		/>
		<Route
			element={<NotFoundPage />}
			path="/404"
		/>
	</Routes>
);
