import { useAuthContext } from '@context/auth.context';
import { appRoutes, type PublicRoutes } from '@routes/appRouters';
import { type JSX } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

export const PublicGuard = (): JSX.Element => {
	const { auth } = useAuthContext();
	const { isLoggedIn } = auth;
	const location = useLocation();

	const isPublicRoute = [
		appRoutes.public.login,
		appRoutes.public.register,
	].includes(location.pathname as PublicRoutes);

	if (isLoggedIn && isPublicRoute) {
		return (
			<Navigate
				replace
				to={appRoutes.private.home}
			/>
		);
	}

	return <Outlet />;
};
