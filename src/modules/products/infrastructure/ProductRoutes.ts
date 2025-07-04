export const ProductRoutes = {
	list: `${import.meta.env.BASE_URL}productos`,
	details: `${import.meta.env.BASE_URL}productos/:id`,
	create: `${import.meta.env.BASE_URL}productos/nuevo`,
	update: `${import.meta.env.BASE_URL}productos/:id/editar`,
} as const;
export type TypeProductRoutes =
	(typeof ProductRoutes)[keyof typeof ProductRoutes];

// Separate URL builders for navigation
export const buildUrl = {
	details: (id: number) => `${import.meta.env.BASE_URL}productos/${id}`,
	update: (id: number) => `${import.meta.env.BASE_URL}productos/${id}/editar`,
} as const;
