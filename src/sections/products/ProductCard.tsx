import StarIcon from '@assets/icons/star-yellow.svg?react';
import { DeleteIcon } from '@components/ui/delete';
import { SquareArrowUpIcon } from '@components/ui/square-arrow-up';
import { SquarePenIcon } from '@components/ui/square-pen';
import type { Product } from '@modules/products/domain/Product';
import type { JSX } from 'react';
import { Link } from 'react-router';

import { useProductActions } from '@/modules/products/infrastructure/useProductActions';
import { appRoutes } from '@/routes/appRouters';

interface Properties {
	/** The product object containing details to display. */
	product: Product;
}

/**
 * Renders star rating with CSS-based half stars using Tailwind
 * @param rating - The rating value (0-5)
 * @returns Array of star components
 */
const renderStars = (rating: number): JSX.Element[] => {
	const STARS: JSX.Element[] = [];
	const TOTAL_STARS = 5;

	for (let index = 1; index <= TOTAL_STARS; index++) {
		const STAR_VALUE = rating - (index - 1); // How many ratings belong to this star
		const FILL_PERCENTAGE = Math.min(Math.max(STAR_VALUE, 0), 1); // Between 0 and 1
		const FILL_PERCENT = Math.round(FILL_PERCENTAGE * 100); // Change to percentage

		if (FILL_PERCENT > 0) {
			STARS.push(
				<div
					key={index}
					className="relative h-4 w-4"
				>
					<div
						className="absolute inset-0 overflow-hidden"
						style={{ width: `${FILL_PERCENT}%` }}
					>
						<StarIcon className="h-4 w-4" />
					</div>
				</div>,
			);
		}
	}

	return STARS;
};

/**
 * This component displays a product card with an image, title, category, ID, description, and price.
 * @returns The rendered ProductCard component.
 * */
export const ProductCard = ({ product }: Properties): JSX.Element => {
	const { id, title, price, image, rating } = product;
	const { deleteProduct } = useProductActions();

	return (
		<div>
			<div className="rounded-sm rounded-xl bg-gray-100 p-7">
				<img
					alt={title}
					className="max-m-36 max-h-36 justify-self-center mix-blend-multiply"
					src={image}
				/>
			</div>
			<h1 className="line-clamp-1 font-primary text-lg font-bold lg:text-xl">
				{title}
			</h1>
			<div className="flex items-center gap-1">
				{renderStars(rating.rate)}
				<p className="text-sm">{rating.rate}/5</p>
			</div>
			<div className="flex items-center justify-between gap-2">
				<p className="text-lg font-bold lg:text-xl">{price}</p>
				<div className="flex items-center">
					<Link
						className="h-6 w-6"
						title="Ver producto"
						to={appRoutes.products.details(id)}
					>
						<SquareArrowUpIcon
							className="text-green-700"
							size={22}
						/>
					</Link>
					<button
						className="h-6 w-6"
						title="Editar producto"
					>
						<SquarePenIcon
							className="text-yellow-700"
							size={22}
						/>
					</button>
					<button
						className="h-6 w-6"
						title="Borrar producto"
						onClick={() => deleteProduct(id)}
					>
						<DeleteIcon
							className="text-red-700"
							size={22}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};
