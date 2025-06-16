export const ProductRoutes = {
	list: '/productos',
	details: `/productos/:productId`,
	create: '/productos/nuevo',
	edit: `/productos/:productId/editar`,
} as const;
export type TypeProductRoutes =
	(typeof ProductRoutes)[keyof typeof ProductRoutes];
