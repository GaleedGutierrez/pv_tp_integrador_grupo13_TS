import type { JSX } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import type { Product } from '@/modules/products/domain/Product';
import { ProductCardSkeleton } from '@/sections/products/components/ProductCardSkeleton';
import { ProductsList } from '@/sections/products/components/ProductsList';

interface Properties {
	product: Product[];
	title: string;
	classNameContainer?: string;
}

/** @returns If there are not products return undefined */
export const CarouselProducts = ({
	product,
	title,
	classNameContainer,
}: Properties): JSX.Element | undefined => {
	const { loading: IS_LOADING } = useAppSelector((state) => state.products);

	if (product.length === 0 && !IS_LOADING) {
		return;
	}

	return (
		<div className={classNameContainer}>
			<h2 className="text-center">{title}</h2>
			<div className="overflow-x-scroll">
				<div className="carousel carousel-center mt-8 gap-5 p-4 lg:mt-14 lg:gap-6 xl:w-full xl:justify-center">
					{IS_LOADING &&
						Array.from({ length: 10 }).map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<ProductCardSkeleton key={index} />
						))}
					{!IS_LOADING && (
						<ProductsList
							className="carousel-item max-w-50"
							products={product}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
