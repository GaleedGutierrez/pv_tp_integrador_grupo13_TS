export const FavoriteRoutes = {
	list: '/favoritos',
} as const;
export type TypeFavoriteRoutes =
	(typeof FavoriteRoutes)[keyof typeof FavoriteRoutes];
