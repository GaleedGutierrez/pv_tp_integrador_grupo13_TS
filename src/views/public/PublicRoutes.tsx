// views/public/PublicApp.tsx
import { appRoutes } from '@routes/appRouters';
import type { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { Layout } from '../Layout';
import { Login } from './Login';
import { Register } from './Register';

export const PublicRoutes = (): JSX.Element => (
	<Routes>
		<Route element={<Layout />}>
			<Route
				element={<Login />}
				path={appRoutes.public.login}
			/>
			<Route
				element={<Register />}
				path={appRoutes.public.register}
			/>

			<Route
				element={<Navigate to={appRoutes.public.login} />}
				path="*"
			/>
		</Route>
	</Routes>
);
