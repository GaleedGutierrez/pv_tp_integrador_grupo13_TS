import { Hero } from '@components/Hero';
import { useAppSelector } from '@hooks/useAppSelector';
import { type JSX } from 'react';

import { CarouselProducts } from './components/CarouselProducts';

/**
 * Home component that serves as the main entry point of the application.
 * @returns The rendered component with routes and a not found page.
 * */
export const Home = (): JSX.Element => {
	const { products } = useAppSelector((state) => state.products);
	const womenProducts = products.filter(
		(product) => product.category === "women's clothing",
	);
	const menProducts = products.filter(
		(product) => product.category === "men's clothing",
	);
	const jewelryProducts = products.filter(
		(product) => product.category === 'jewelery',
	);
	const electronicsProducts = products.filter(
		(product) => product.category === 'electronics',
	);

	return (
		<>
			<Hero />
			<section className="py-12 lg:py-18">
				<CarouselProducts
					product={womenProducts}
					title="Ropa de mujer"
				/>
				<CarouselProducts
					classNameContainer="mt-12 lg:mt-18"
					product={menProducts}
					title="Ropa de hombre"
				/>
				<CarouselProducts
					classNameContainer="mt-12 lg:mt-18"
					product={jewelryProducts}
					title="Joyería"
				/>
				<CarouselProducts
					classNameContainer="mt-12 lg:mt-18"
					product={electronicsProducts}
					title="Electrónica"
				/>
			</section>
		</>
	);
};
