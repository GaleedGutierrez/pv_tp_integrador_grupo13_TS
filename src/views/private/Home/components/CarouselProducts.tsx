import { type JSX, useCallback, useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import type { Product } from '@/modules/products/domain/Product';
import { ProductCardSkeleton } from '@/sections/products/components/ProductCardSkeleton';
import { ProductsList } from '@/sections/products/components/ProductsList';

interface Properties {
	products: Product[];
	title: string;
	classNameContainer?: string;
}

function getRandomIntInclusive(min: number, max: number): number {
	const MIN_CEILED = Math.ceil(min);
	const MAX_FLOORED = Math.floor(max);

	return Math.floor(
		Math.random() * (MAX_FLOORED - MIN_CEILED + 1) + MIN_CEILED,
	); // The maximum is inclusive and the minimum is inclusive
}

/** @returns If there are not products return undefined */
export const CarouselProducts = ({
	products,
	title,
	classNameContainer,
}: Properties): JSX.Element | undefined => {
	const { loading: IS_LOADING } = useAppSelector((state) => state.products);
	const [shouldCenterCarousel, setShouldCenterCarousel] = useState(false);
	const OVERFLOW_CONTAINER_ID = useRef(
		`${title.replaceAll(' ', '_')}_${getRandomIntInclusive(0, 1000)}_OVERFLOW`,
	);
	const CAROUSEL_CONTAINER_ID = useRef(
		`${title.replaceAll(' ', '_')}_${getRandomIntInclusive(0, 1000)}_CAROUSEL`,
	);

	const checkShouldCenter = useCallback((): void => {
		if (window.innerWidth < 900) {
			setShouldCenterCarousel(false);

			return;
		}

		const CAROUSEL_CONTAINER = document.querySelector(
			`#${CAROUSEL_CONTAINER_ID.current}`,
		);
		const OVERFLOW_CONTAINER = document.querySelector(
			`#${OVERFLOW_CONTAINER_ID.current}`,
		);

		if (!CAROUSEL_CONTAINER || !OVERFLOW_CONTAINER) {
			return;
		}

		const CAROUSEL_CONTAINER_WIDTH = CAROUSEL_CONTAINER.scrollWidth;
		const OVERFLOW_CONTAINER_WIDTH = OVERFLOW_CONTAINER.clientWidth;
		const SHOULD_CENTER =
			CAROUSEL_CONTAINER_WIDTH <= OVERFLOW_CONTAINER_WIDTH;

		setShouldCenterCarousel(SHOULD_CENTER);
	}, []);

	// ✅ Effect para configurar observers y listeners
	useEffect(() => {
		const CAROUSEL_CONTAINER = document.querySelector(
			`#${CAROUSEL_CONTAINER_ID.current}`,
		);
		const OVERFLOW_CONTAINER = document.querySelector(
			`#${OVERFLOW_CONTAINER_ID.current}`,
		);

		if (!CAROUSEL_CONTAINER || !OVERFLOW_CONTAINER) {
			return;
		}

		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(checkShouldCenter);
		});

		const mutationObserver = new MutationObserver(() => {
			setTimeout(checkShouldCenter, 100);
		});

		const mediaQuery = globalThis.matchMedia('(min-width: 900px)');
		const handleMediaChange = (): void => {
			setTimeout(checkShouldCenter, 100);
		};

		setTimeout(checkShouldCenter, 200);

		resizeObserver.observe(OVERFLOW_CONTAINER);
		mutationObserver.observe(CAROUSEL_CONTAINER, {
			childList: true,
			subtree: true,
		});
		mediaQuery.addEventListener('change', handleMediaChange);

		return (): void => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
			mediaQuery.removeEventListener('change', handleMediaChange);
		};
	}, [checkShouldCenter]);

	if (products.length === 0 && !IS_LOADING) {
		return;
	}

	return (
		<div className={classNameContainer}>
			<h2 className="text-center">{title}</h2>
			<div
				className="overflow-x-scroll"
				id={OVERFLOW_CONTAINER_ID.current}
			>
				<div
					className={`carousel carousel-center mt-8 gap-5 p-4 lg:mt-14 lg:gap-6 ${shouldCenterCarousel ? 'w-full justify-center' : ''}`}
					id={CAROUSEL_CONTAINER_ID.current}
				>
					{IS_LOADING &&
						Array.from({ length: 10 }).map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<ProductCardSkeleton key={index} />
						))}
					{!IS_LOADING && (
						<ProductsList
							className="carousel-item max-w-50"
							products={products}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
