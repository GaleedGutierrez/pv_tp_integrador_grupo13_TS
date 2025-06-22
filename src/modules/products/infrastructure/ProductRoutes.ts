export const ProductRoutes = {
	list: '/productos',
	details: '/productos/:id',
	create: '/productos/nuevo',
	update: '/productos/:id/edit',
} as const;
export type TypeProductRoutes =
	(typeof ProductRoutes)[keyof typeof ProductRoutes];

// Separate URL builders for navigation
export const buildUrl = {
	details: (id: number) => `/productos/${id}`,
	update: (id: number) => `/productos/${id}/edit`,
} as const;
