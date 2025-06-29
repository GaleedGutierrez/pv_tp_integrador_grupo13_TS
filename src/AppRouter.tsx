import { PrivateGuard } from '@guard/PrivateGuard';
import { appRoutes } from '@routes/appRouters';
import { PrivateRouter } from '@views/private/PrivateRouter';
import { PublicRouter } from '@views/public/PublicRouter';
import type { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

/**
 * Main application router.
 * This component sets up the routing for the application using React Router.
 * It defines the routes and their corresponding components.
 */
function AppRouter(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PublicRouter />} />

				<Route element={<PrivateGuard />}>
					<Route
						element={<PrivateRouter />}
						path={`${appRoutes.private.home}/*`}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
