import type { Product } from '@modules/products/domain/Product';
import type { JSX } from 'react';

import { ProductCard } from './ProductCard';

interface Properties {
	/** List of products to display in the component. */
	products: Product[];
	/**  Optional className to apply additional styles to the component. */
	className?: string;
}

export const ProductsList = ({
	products,
	className,
}: Properties): JSX.Element => (
	<>
		{products.map((product) => (
			<article
				key={product.id}
				className={className}
			>
				<ProductCard product={product} />
			</article>
		))}
	</>
);
