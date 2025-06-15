import type Product from '@domain/Product';
import type { JSX } from 'react';

interface Properties {
	/** The product object containing details to display. */
	product: Product;
}

/**
 * This component displays a product card with an image, title, category, ID, description, and price.
 * @returns The rendered ProductCard component.
 * */
export const ProductCard = ({ product }: Properties): JSX.Element => {
	const { id, title, category, description, price, image } = product;

	return (
		<div>
			<div className="rounded-sm rounded-xl bg-gray-100 p-7">
				<img
					alt=""
					className="max-m-36 max-h-36 justify-self-center mix-blend-multiply"
					src={image}
				/>
			</div>
			<h1 className="line-clamp-1 font-primary text-lg font-bold lg:text-xl">
				{title}
			</h1>
			<div className="flex items-center justify-between">
				<p className="text-xs font-thin capitalize">{category}</p>
				<small className="text-xs font-thin">ID: {id}</small>
			</div>
			<p className="line-clamp-3">{description}</p>
			<p className="text-lg font-bold lg:text-xl">{price}</p>
		</div>
	);
};
