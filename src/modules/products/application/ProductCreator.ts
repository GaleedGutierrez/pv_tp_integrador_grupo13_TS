import type { Product } from '../domain/Product';
import type { ProductRepository } from '../domain/ProductRepository';

export class ProductCreator {
	readonly #repository: ProductRepository;
	public constructor(repository: ProductRepository) {
		this.#repository = repository;
	}

	public async create(
		product: Omit<Product, 'id' | 'rating'>,
	): Promise<void | Omit<Product, 'rating'>> {
		try {
			const PRODUCTS = await this.#repository.save(product);

			if (!PRODUCTS) {
				throw new Error(`Failed to create product: ${product.title}`);
			}

			return PRODUCTS;
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}
}
