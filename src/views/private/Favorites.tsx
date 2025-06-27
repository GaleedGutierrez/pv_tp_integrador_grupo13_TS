import { useAppSelector } from '@hooks/useAppSelector';
import { ProductsList } from '@sections/products/components/ProductsList';
import { type JSX } from 'react';

/**
 * Home component that serves as the main entry point of the application.
 * @returns The rendered component with routes and a not found page.
 * */
export const Favorites = (): JSX.Element => {
	const FAVORITES_PRODUCTS = useAppSelector((state) => state.favorites);

	if (FAVORITES_PRODUCTS.length === 0) {
		return (
			<section className="py-12 lg:py-18">
				<h2 className="text-center text-2xl font-bold">
					No tienes productos favoritos
				</h2>
			</section>
		);
	}

	return (
		<section className="p-12 lg:py-18">
			<h2 className="mb-5 text-center text-3xl font-bold">
				Tus productos favoritos
			</h2>
			<div className="mx-auto grid max-w-239 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] justify-items-center gap-10">
				<ProductsList
					className="carousel-item max-w-50"
					products={FAVORITES_PRODUCTS}
				/>
			</div>
		</section>
	);
};
