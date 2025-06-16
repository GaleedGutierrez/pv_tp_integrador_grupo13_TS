import { Home } from '@views/Home';
import { RoutesWithNotFound } from '@views/NotFoundPage';
import type { JSX } from 'react';
import { BrowserRouter, Route } from 'react-router';

import { AppRoutes } from '@/routes/appRouters';

import { Layout } from './views/Layout';

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
					path={AppRoutes.home.index}
				>
					<Route
						element={<Home />}
						path={AppRoutes.home.index}
					/>
					{/* <Route
					element={<Favorites />}
					path={AppRoutes.favorites}
				/> */}
					{/* <Route
					element={<ProductsDetails />}
					path={AppRoutes.products.productsDetails}
				/> */}
					{/* <Route
						element={<AddNewProduct />}
						path={AppRoutes.products.addNewProduct}
					/> */}
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
