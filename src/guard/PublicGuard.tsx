// import { LoadingSpinner } from '@components/LoadingSpinner';
// import { useAuthContext } from '@context/auth.context';
// import { appRoutes } from '@routes/appRouters';
// import { type JSX } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router';

// import { isRestrictedPublicRoute, logGuardAction } from './guard.utils';

// /**
//  * Public Guard - Protege rutas públicas de usuarios autenticados
//  * Redirige usuarios logueados desde login/register hacia home
//  */
// export const PublicGuard = (): JSX.Element => {
// 	const { auth } = useAuthContext();
// 	const { isLoggedIn, isLoading } = auth;
// 	const location = useLocation();

// 	// Debug información para desarrollo
// 	logGuardAction('PublicGuard', 'Estado verificado', {
// 		isLoggedIn,
// 		isLoading,
// 		pathname: location.pathname,
// 		isRestrictedRoute: isRestrictedPublicRoute(location.pathname),
// 	});

// 	// Mostrar loading mientras se verifica la autenticación
// 	if (isLoading) {
// 		logGuardAction('PublicGuard', 'Mostrando loading', {
// 			pathname: location.pathname,
// 		});

// 		return <LoadingSpinner message="Verificando estado de sesión..." />;
// 	}

// 	// Si está autenticado y trata de acceder a login/register, redirigir a home
// 	if (isLoggedIn && isRestrictedPublicRoute(location.pathname)) {
// 		logGuardAction('PublicGuard', 'Usuario autenticado redirigido', {
// 			from: location.pathname,
// 			to: appRoutes.private.home,
// 		});

// 		return (
// 			<Navigate
// 				replace
// 				to={appRoutes.private.home}
// 			/>
// 		);
// 	}

// 	// En cualquier otro caso, permitir acceso
// 	logGuardAction('PublicGuard', 'Acceso permitido', {
// 		pathname: location.pathname,
// 	});

// 	return <Outlet />;
// };
// eslint-disable-next-line unicorn/no-empty-file
