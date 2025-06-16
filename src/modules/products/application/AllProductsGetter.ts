import type { Product } from '../domain/Product';
import type { ProductRepository } from '../domain/ProductRepository';

export class AllProductsGetter {
	readonly #repository: ProductRepository;
	public constructor(repository: ProductRepository) {
		this.#repository = repository;
	}

	public async get(): Promise<void | Product[]> {
		try {
			const PRODUCTS = await this.#repository.getAll();

			if (!PRODUCTS) {
				throw new Error('Failed to get all products');
			}

			return PRODUCTS;
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}
}
