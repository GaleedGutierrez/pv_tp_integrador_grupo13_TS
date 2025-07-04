// /**
//  * Utilidades para debugging y manejo de guards
//  */

// import { appRoutes } from '@routes/appRouters';

// /**
//  * Determina si una ruta es pública o privada
//  */
// export const isPublicRoute = (pathname: string): boolean => {
// 	const publicRoutes = [
// 		appRoutes.public.login,
// 		appRoutes.public.register,
// 		appRoutes.root,
// 	];

// 	return publicRoutes.includes(pathname as (typeof publicRoutes)[number]);
// };

// /**
//  * Determina si una ruta es privada
//  */
// export const isPrivateRoute = (pathname: string): boolean =>
// 	pathname.startsWith('/home');

// /**
//  * Determina si una ruta es restringida para usuarios autenticados
//  */
// export const isRestrictedPublicRoute = (pathname: string): boolean => {
// 	const restrictedRoutes = [
// 		appRoutes.public.login,
// 		appRoutes.public.register,
// 	];

// 	return restrictedRoutes.includes(
// 		pathname as (typeof restrictedRoutes)[number],
// 	);
// };

// /**
//  * Obtiene la ruta de redirección por defecto según el estado de autenticación
//  */
// export const getDefaultRedirectRoute = (isLoggedIn: boolean): string =>
// 	isLoggedIn ? appRoutes.private.home : appRoutes.public.login;

// /**
//  * Logs para debugging (solo en desarrollo)
//  */
// export const logGuardAction = (
// 	guard: 'PrivateGuard' | 'PublicGuard',
// 	action: string,
// 	details: Record<string, unknown>,
// ): void => {
// 	if (process.env.NODE_ENV === 'development') {
// 		console.info(`[${guard}] ${action}`, details);
// 	}
// };
// eslint-disable-next-line unicorn/no-empty-file
