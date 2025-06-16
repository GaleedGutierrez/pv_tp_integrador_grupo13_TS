export const HomeRoutes = {
	index: '/',
} as const;
export type TypeHomeRoutes = (typeof HomeRoutes)[keyof typeof HomeRoutes];
