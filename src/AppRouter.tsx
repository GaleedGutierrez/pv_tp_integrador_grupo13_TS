import { appRoutes } from '@routes/appRouters';
import { Favorites } from '@views/Favorites';
import { Home } from '@views/Home/index';
import { Layout } from '@views/Layout';
import { RoutesWithNotFound } from '@views/NotFoundPage';
import { ProductsDetails } from '@views/ProductsDetails';
import type { JSX } from 'react';
import { BrowserRouter, Route } from 'react-router';

import { CreateProduct } from './views/CreateProduct';

/**
 * Main application router.
 * This component sets up the routing for the application using React Router.
 * It defines the routes and their corresponding components.
 */
function AppRouter(): JSX.Element {
	return (
		<BrowserRouter>
			<RoutesWithNotFound>
				<Route
					element={<Layout />}
					path={appRoutes.home.index}
				>
					<Route
						element={<Home />}
						path={appRoutes.home.index}
					/>
					<Route
						element={<Favorites />}
						path={appRoutes.favorites.list}
					/>
					<Route
						element={<ProductsDetails />}
						path={appRoutes.products.routes.details}
					/>
					<Route
						element={<CreateProduct />}
						path={appRoutes.products.routes.create}
					/>
					{/* <Route
					element={<UpdateProduct />}
					path={AppRoutes.products.updateProduct}
				/> */}
				</Route>
			</RoutesWithNotFound>
		</BrowserRouter>
	);
}

export default AppRouter;
