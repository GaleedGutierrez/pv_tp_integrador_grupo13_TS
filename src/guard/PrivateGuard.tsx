// import { LoadingSpinner } from '@components/LoadingSpinner';
// import { useAuthContext } from '@context/auth.context';
// import { appRoutes } from '@routes/appRouters';
// import { type JSX } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router';

// import { logGuardAction } from './guard.utils';

// /**
//  * Private Guard - Protege rutas que requieren autenticación
//  * Solo permite acceso a usuarios autenticados
//  */
// export const PrivateGuard = (): JSX.Element => {
// 	const { auth } = useAuthContext();
// 	const { isLoggedIn, isLoading } = auth;
// 	const location = useLocation();

// 	// Debug información para desarrollo
// 	logGuardAction('PrivateGuard', 'Estado verificado', {
// 		isLoggedIn,
// 		isLoading,
// 		pathname: location.pathname,
// 	});

// 	// Mostrar loading mientras se verifica la autenticación
// 	if (isLoading) {
// 		logGuardAction('PrivateGuard', 'Mostrando loading', {
// 			pathname: location.pathname,
// 		});

// 		return <LoadingSpinner message="Verificando autenticación..." />;
// 	}

// 	// Si no está autenticado, redirigir a login guardando la ruta solicitada
// 	if (!isLoggedIn) {
// 		logGuardAction('PrivateGuard', 'Redirigiendo a login', {
// 			from: location.pathname,
// 			to: appRoutes.public.login,
// 		});

// 		return (
// 			<Navigate
// 				replace
// 				state={{ from: location.pathname }}
// 				to={appRoutes.public.login}
// 			/>
// 		);
// 	}

// 	// Si está autenticado, permitir acceso a la ruta privada
// 	logGuardAction('PrivateGuard', 'Acceso permitido', {
// 		pathname: location.pathname,
// 	});

// 	return <Outlet />;
// };
// eslint-disable-next-line unicorn/no-empty-file
