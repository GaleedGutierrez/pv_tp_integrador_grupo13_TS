import type { Product } from '../domain/Product';
import type { ProductRepository } from '../domain/ProductRepository';

export class ProductGetter {
	readonly #repository: ProductRepository;
	public constructor(repository: ProductRepository) {
		this.#repository = repository;
	}

	public async get(id: number): Promise<void | Product> {
		try {
			const PRODUCTS = await this.#repository.searchById(id);

			if (!PRODUCTS) {
				throw new Error(`Failed to get product with ID: ${id}`);
			}

			return PRODUCTS;
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}
}
