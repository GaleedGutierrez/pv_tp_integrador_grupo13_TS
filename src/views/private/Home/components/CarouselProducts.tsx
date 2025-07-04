import { useAppSelector } from '@hooks/useAppSelector';
import type { Product } from '@modules/products/domain/Product';
import { ProductCard } from '@sections/products/components/ProductCard';
import { ProductCardSkeleton } from '@sections/products/components/ProductCardSkeleton';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@ui/carousel';
import { type JSX } from 'react';

interface Properties {
	products: Product[];
	title: string;
}

/** @returns If there are not products return undefined */
export const CarouselProducts = ({
	products,
	title,
}: Properties): JSX.Element | undefined => {
	const { isLoading } = useAppSelector((state) => state.products);

	if (products.length === 0 && !isLoading) {
		return;
	}

	return (
		<div>
			<h2 className="text-center">{title}</h2>
			<div className="preview flex h-[450px] w-full justify-center p-15 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start">
				<Carousel
					className="w-full"
					opts={{
						align: 'start',
					}}
				>
					<CarouselContent>
						{isLoading &&
							Array.from({ length: 4 }).map((_, index) => (
								<CarouselItem
									// eslint-disable-next-line react/no-array-index-key
									key={index}
									className="md:basis-1/2 lg:basis-1/4"
								>
									<ProductCardSkeleton />
								</CarouselItem>
							))}
						{!isLoading &&
							products.map((product) => (
								<CarouselItem
									key={product.id}
									className="md:basis-1/2 lg:basis-1/4"
								>
									<ProductCard product={product} />
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
};
