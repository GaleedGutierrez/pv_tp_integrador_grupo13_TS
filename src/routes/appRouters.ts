import { FavoriteRoutes } from '@modules/favorites/infrastructure/FavoritesRoutes';
import { HomeRoutes } from '@modules/home/infrastructure/HomeRoutes';
import {
	buildUrl as ProductRoutesBuildUrl,
	ProductRoutes,
} from '@modules/products/infrastructure/ProductRoutes';
import { UsersRoutes } from '@modules/users/infrastructure/UsersRoutes';

export const appRoutes = {
	home: HomeRoutes,
	products: { routes: ProductRoutes, buildUrl: ProductRoutesBuildUrl },
	favorites: FavoriteRoutes,
	register: UsersRoutes.register,
	login: UsersRoutes.login,
} as const;
