export const ProductRoutes = {
	list: '/productos',
	details: (id: number) => `/productos/${id}`,
	create: '/productos/nuevo',
	edit: (id: number) => `/productos/${id}/editar`,
} as const;
export type TypeProductRoutes =
	(typeof ProductRoutes)[keyof typeof ProductRoutes];
