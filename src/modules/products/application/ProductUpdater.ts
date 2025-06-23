import type { Product } from '../domain/Product';
import type { ProductRepository } from '../domain/ProductRepository';

export class ProductUpdater {
	readonly #repository: ProductRepository;
	public constructor(repository: ProductRepository) {
		this.#repository = repository;
	}

	public async update(
		product: Omit<Product, 'rating'>,
	): Promise<void | Omit<Product, 'rating'>> {
		try {
			const PRODUCTS = await this.#repository.update(product);

			if (!PRODUCTS) {
				throw new Error(`Failed to get product with ID: ${product.id}`);
			}

			return PRODUCTS;
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}
}
