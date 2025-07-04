export const FavoriteRoutes = {
	list: `${import.meta.env.BASE_URL}favoritos`,
} as const;
export type TypeFavoriteRoutes =
	(typeof FavoriteRoutes)[keyof typeof FavoriteRoutes];
