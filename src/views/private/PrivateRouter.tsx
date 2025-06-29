// import { Navigate, Route } from 'react-router';
import { appRoutes } from '@routes/appRouters';
import type { JSX } from 'react';
import { Route } from 'react-router';

import { Layout } from '../Layout';
import { RoutesWithNotFound } from '../NotFoundPage';
import { CreateProduct } from './CreateProduct';
import { Favorites } from './Favorites';
import { Home } from './Home';
import { ProductsDetails } from './ProductsDetails';
import { UpdateProduct } from './UpdateProduct';

export const PrivateRouter = (): JSX.Element => (
	<RoutesWithNotFound>
		<Route element={<Layout />}>
			<Route
				element={<Home />}
				path={appRoutes.private.home}
			/>
			<Route
				element={<Favorites />}
				path={appRoutes.private.favorites.list}
			/>
			<Route
				element={<ProductsDetails />}
				path={appRoutes.private.products.routes.details}
			/>
			<Route
				element={<CreateProduct />}
				path={appRoutes.private.products.routes.create}
			/>
			<Route
				element={<UpdateProduct />}
				path={appRoutes.private.products.routes.update}
			/>
		</Route>
	</RoutesWithNotFound>
);
