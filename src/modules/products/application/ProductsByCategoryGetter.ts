import type { Product } from '../domain/Product';
import type { TypeProductCategory } from '../domain/ProductCategory';
import type { ProductRepository } from '../domain/ProductRepository';

export class ProductsByCategoryGetter {
	readonly #repository: ProductRepository;
	public constructor(repository: ProductRepository) {
		this.#repository = repository;
	}

	public async get(category: TypeProductCategory): Promise<Product[]> {
		try {
			const PRODUCTS = await this.#repository.getByCategory(category);

			if (!PRODUCTS) {
				throw new Error(`No products found for category: ${category}`);
			}

			return PRODUCTS;
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}

			throw new Error(
				'Unknown error occurred while getting products by category',
			);
		}
	}
}
