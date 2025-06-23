import type { Product } from '../domain/Product';

export const productToPlainObject = (product: Product): Product => ({
	id: product.id,
	title: product.title,
	price: product.price,
	description: product.description,
	category: product.category,
	image: product.image,
	rating: product.rating
		? {
				rate: product.rating.rate,
				count: product.rating.count,
			}
		: undefined,
});
