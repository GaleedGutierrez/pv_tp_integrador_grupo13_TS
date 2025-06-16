import type { Product } from '../domain/Product';
import type { ProductRepository } from '../domain/ProductRepository';

export class ProductGetter {
	readonly #repository: ProductRepository;
	public constructor(repository: ProductRepository) {
		this.#repository = repository;
	}

	public async update(product: Product): Promise<void | Product> {
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
