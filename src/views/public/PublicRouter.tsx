import { appRoutes } from '@routes/appRouters';
import type { JSX } from 'react';
import { Route } from 'react-router';

import { Layout } from '../Layout';
import { RoutesWithNotFound } from '../NotFoundPage';
import { Login } from './Login';
import { Register } from './Register';

export const PublicRouter = (): JSX.Element => (
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
		</Route>
	</RoutesWithNotFound>
);
