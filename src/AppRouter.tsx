import { PrivateGuard } from '@guard/PrivateGuard';
import { appRoutes } from '@routes/appRouters';
import { Layout } from '@views/Layout';
import { RoutesWithNotFound } from '@views/NotFoundPage';
import { PrivateRouter } from '@views/private/PrivateRouter';
import { Login } from '@views/public/Login';
import { Register } from '@views/public/Register';
import type { JSX } from 'react';
import { BrowserRouter, Route } from 'react-router';

/**
 * Main application router.
 * This component sets up the routing for the application using React Router.
 * It defines the routes and their corresponding components.
 */
function AppRouter(): JSX.Element {
	return (
		<BrowserRouter>
			<RoutesWithNotFound>
				<Route element={<Layout />}>
					<Route
						element={<Login />}
						path={appRoutes.login}
					/>
					<Route
						element={<Register />}
						path={appRoutes.register}
					/>

					<Route element={<PrivateGuard />}>
						<Route
							element={<PrivateRouter />}
							path={`${appRoutes.private.home}/*`}
						/>
					</Route>
				</Route>
			</RoutesWithNotFound>
		</BrowserRouter>
	);
}

export default AppRouter;
