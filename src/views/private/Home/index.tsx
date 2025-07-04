import { Hero } from '@components/Hero';
import { useAppSelector } from '@hooks/useAppSelector';
import { type JSX } from 'react';

import { CarouselProducts } from './components/CarouselProducts';

/**
 * Home component that serves as the main entry point of the application.
 * @returns The rendered component with routes and a not found page.
 * */
export const Home = (): JSX.Element => {
	const { items: products } = useAppSelector((state) => state.products);
	const WOMEN_PRODUCTS = products.filter(
		(product) => product.category === "women's clothing",
	);
	const MEN_PRODUCTS = products.filter(
		(product) => product.category === "men's clothing",
	);
	const JEWELRY_PRODUCTS = products.filter(
		(product) => product.category === 'jewelery',
	);
	const ELECTRONICS_PRODUCTS = products.filter(
		(product) => product.category === 'electronics',
	);

	return (
		<>
			<Hero />
			<section
				className="py-12 lg:py-18"
				id="home-products"
			>
				<CarouselProducts
					products={WOMEN_PRODUCTS}
					title="Ropa de mujer"
				/>
				<CarouselProducts
					products={MEN_PRODUCTS}
					title="Ropa de hombre"
				/>
				<CarouselProducts
					products={JEWELRY_PRODUCTS}
					title="Joyería"
				/>
				<CarouselProducts
					products={ELECTRONICS_PRODUCTS}
					title="Electrónica"
				/>
			</section>
		</>
	);
};
