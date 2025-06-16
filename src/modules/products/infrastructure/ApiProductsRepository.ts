import { Product } from '@modules/products/domain/Product';
import { fetchData } from '@utils/fetchData';

import type {
	ProductCategory,
	TypeProductCategory,
} from '../domain/ProductCategory';
import type { ProductRepository } from '../domain/ProductRepository';

/**
 * ApiProduct - Represents a student in the system.
 */
export interface ApiProduct {
	/** Unique identifier for the product */
	id: number;
	/** Display name of the product */
	title: string;
	/** Price as a string (e.g., "$19.99") */
	price: number;
	/** Detailed description of the product */
	description: string;
	/** Product category from predefined options */
	category: (typeof ProductCategory)[keyof typeof ProductCategory];
	/** URL or path to the product image */
	image: string;
	/** Optional rating information */
	rating: {
		/** Average rating score */
		rate: number;
		/** Number of ratings received */
		count: number;
	};
}

/**
 * Implementation of ProductRepository using the Fake Store API
 * This class provides methods to interact with the Fake Store API for product data.
 */
export class ApiProductsRepository implements ProductRepository {
	/**
	 * Base URL for the Fake Store API
	 */
	readonly #URL_BASE = 'https://fakestoreapi.com';

	/**
	 * Searches for all products
	 * @throws TypeError If the request fails or the response is not valid
	 * @returns A promise that resolves with an array of products or undefined if not found
	 */
	public async getAll(): Promise<Product[] | void> {
		const ENDPOINT = `${this.#URL_BASE}/products`;

		try {
			const DATA = await fetchData<ApiProduct[]>(ENDPOINT);

			if (!DATA || DATA instanceof Response) {
				throw new Error('Failed to get all products');
			}

			return DATA.map(
				(product) =>
					new Product({
						id: product.id,
						title: product.title,
						price: product.price,
						description: product.description,
						category: product.category,
						image: product.image,
						rating: {
							rate: product.rating.rate,
							count: product.rating.count,
						},
					}),
			);
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}

	/**
	 * Searches for a product by ID
	 * @param id - The ID of the product to search for
	 * @throws TypeError If the request fails or the response is not valid
	 * @returns A promise that resolves with the product or undefined if not found
	 */
	public async searchById(id: number): Promise<Product | void> {
		const ENDPOINT = `${this.#URL_BASE}/products/${id}`;

		try {
			const DATA = await fetchData<ApiProduct>(ENDPOINT);

			if (!DATA || DATA instanceof Response) {
				throw new Error(`Failed to get product with ID: ${id}`);
			}

			return new Product({
				id: DATA.id,
				title: DATA.title,
				price: DATA.price,
				description: DATA.description,
				category: DATA.category,
				image: DATA.image,
				rating: {
					rate: DATA.rating.rate,
					count: DATA.rating.count,
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}

	/**
	 * Save a new product
	 * Sends a POST request to save a new product in the Fake Store API
	 * Posted data will not really insert into the database and just return a fake id.
	 * This is a limitation of the Fake Store API, which is intended for testing purposes only.
	 * @see https://github.com/keikaavousi/fake-store-api?tab=readme-ov-file#add-new-product
	 * @param product - The product to save
	 * @throws TypeError If the request fails or the response is not valid
	 * @returns A promise that resolves with the saved product or undefined if not found.
	 */
	public async save(product: Omit<Product, 'id'>): Promise<Product | void> {
		const ENDPOINT = `${this.#URL_BASE}/products`;

		try {
			const DATA = await fetchData<ApiProduct>(ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			});

			if (!DATA || DATA instanceof Response) {
				throw new Error('Failed to create product');
			}

			return new Product({
				id: DATA.id,
				title: DATA.title,
				price: DATA.price,
				description: DATA.description,
				category: DATA.category,
				image: DATA.image,
				rating: {
					rate: DATA.rating.rate,
					count: DATA.rating.count,
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}

	/**
	 * Updates an existing product
	 * Sends a PUT request to update an existing product in the Fake Store API
	 * Edited data will not really be updated into the database.
	 * This is a limitation of the Fake Store API, which is intended for testing purposes only.
	 * @see https://github.com/keikaavousi/fake-store-api?tab=readme-ov-file#updating-a-product
	 * @param product - The product to update
	 * @throws TypeError If the request fails or the response is not valid
	 * @returns A promise that resolves with the updated product or undefined if not found
	 */
	public async update(product: Product): Promise<Product | void> {
		const { id } = product;
		const ENDPOINT = `${this.#URL_BASE}/products/${id}`;

		try {
			const DATA = await fetchData<ApiProduct>(ENDPOINT, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			});

			if (!DATA || DATA instanceof Response) {
				throw new Error('Failed to create product');
			}

			return new Product({
				id: DATA.id,
				title: DATA.title,
				price: DATA.price,
				description: DATA.description,
				category: DATA.category,
				image: DATA.image,
				rating: {
					rate: DATA.rating.rate,
					count: DATA.rating.count,
				},
			});
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}

	/**
	 * Deletes a product by ID
	 * Sends a DELETE request to remove a product from the Fake Store API
	 * Nothing will delete on the database.
	 * This is a limitation of the Fake Store API, which is intended for testing purposes only.
	 * @see https://github.com/keikaavousi/fake-store-api?tab=readme-ov-file#deleting-a-product
	 * @param id - The ID of the product to delete
	 * @throws TypeError If the request fails or the response is not valid
	 * @returns A promise that resolves when the product is deleted
	 */
	public async delete(id: number): Promise<void> {
		const ENDPOINT = `${this.#URL_BASE}/products/${id}`;

		try {
			const RESPONSE = await fetchData<ApiProduct>(ENDPOINT, {
				method: 'DELETE',
			});

			if (!(RESPONSE instanceof Response) || !RESPONSE.ok) {
				throw new Error('Failed to delete product');
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}

	/**
	 * Searches for products by category
	 * Sends a GET request to search for products by category
	 * @returns A promise that resolves with an array of products in the specified category or undefined if not found
	 * @throws TypeError If the request fails or the response is not valid
	 */
	public async getAllCategories(): Promise<TypeProductCategory[] | void> {
		const ENDPOINT = `${this.#URL_BASE}/products/categories`;

		try {
			const DATA =
				await fetchData<
					(typeof ProductCategory)[keyof typeof ProductCategory][]
				>(ENDPOINT);

			if (!DATA || DATA instanceof Response) {
				throw new Error('Failed to create product');
			}

			return DATA;
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}

	/**
	 * Searches for all products in a specific category.
	 * @param category - The category to search for products in.
	 * @returns A promise that resolves with an array of products in the specified category or undefined if not found.
	 * @throws TypeError If the request fails or the response is not valid.
	 */
	public async getByCategory(
		category: TypeProductCategory,
	): Promise<Product[] | void> {
		const ENDPOINT = `${this.#URL_BASE}/products/category/${category}`;

		try {
			const DATA = await fetchData<ApiProduct[]>(ENDPOINT);

			if (!DATA || DATA instanceof Response) {
				throw new Error(
					`Failed to get products in category: ${category}`,
				);
			}

			return DATA.map(
				(product) =>
					new Product({
						id: product.id,
						title: product.title,
						price: product.price,
						description: product.description,
						category: product.category,
						image: product.image,
						rating: {
							rate: product.rating.rate,
							count: product.rating.count,
						},
					}),
			);
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	}
}
