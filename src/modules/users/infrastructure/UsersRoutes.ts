export const UsersRoutes = {
	register: '/registrar',
	login: '/iniciar-sesion',
} as const;
export type TypeUsersRoutes = (typeof UsersRoutes)[keyof typeof UsersRoutes];
