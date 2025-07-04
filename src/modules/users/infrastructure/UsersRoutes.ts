export const UsersRoutes = {
	register: `${import.meta.env.BASE_URL}registrar`,
	login: `${import.meta.env.BASE_URL}iniciar-sesion`,
} as const;
export type TypeUsersRoutes = (typeof UsersRoutes)[keyof typeof UsersRoutes];
