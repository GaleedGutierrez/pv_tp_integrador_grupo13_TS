import type { Product } from '../domain/Product';
import type { ProductRepository } from '../domain/ProductRepository';

export class ProductRemover {
	readonly #repository: ProductRepository;
	public constructor(repository: ProductRepository) {
		this.#repository = repository;
	}

	public async remove(id: number): Promise<void | Product> {
		try {
			await this.#repository.delete(id);
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}
}
