import type { ProductCategory } from '../domain/ProductCategory';
import type { ProductRepository } from '../domain/ProductRepository';

export class AllProductsCategoriesGetter {
	readonly #repository: ProductRepository;
	public constructor(repository: ProductRepository) {
		this.#repository = repository;
	}

	public async get(): Promise<
		(typeof ProductCategory)[keyof typeof ProductCategory][] | void
	> {
		try {
			const CATEGORIES = await this.#repository.getAllCategories();

			if (!CATEGORIES) {
				throw new Error('Failed to get all categories');
			}

			return CATEGORIES;
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}

			throw new Error('Unknown error occurred while getting categories');
		}
	}
}
