import type { ApiProduct } from '@modules/products/infrastructure/ApiProductsRepository';

export const ProductRepositoryMother = {
	create: (overrides?: Partial<ApiProduct>): ApiProduct => ({
		id: 21,
		title: 'Remera de prueba',
		price: 100,
		description: 'Algodón 100%',
		category: "men's clothing",
		image: 'https://picsum.photos/200/300',
		...overrides,
	}),
};
