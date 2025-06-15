import type { ProductCategory } from '@models/domain/Product.model';
import { fetchData } from '@utils/fetchData';

import Product from '@/domain/Product';
import type { ProductFromFakeStoreApi } from '@/models/domain/ProductFromFakeStoreApi.model';

/**
 * Implementation of ProductRepository using the Fake Store API
 * This class provides methods to interact with the Fake Store API for product data.
 */
export class FakeStoreApiRepository {
	/**
	 * Base URL for the Fake Store API
	 */
	readonly #URL_BASE = 'https://fakestoreapi.com';

	/**
	 * Searches for all products
	 * @throws TypeError If the request fails or the response is not valid
	 * @returns A promise that resolves with an array of products or undefined if not found
	 */
	async getAll(): Promise<Product[] | void> {
		const ENDPOINT = `${this.#URL_BASE}/products`;

		try {
			const DATA = await fetchData<ProductFromFakeStoreApi[]>(ENDPOINT);

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
	async searchById(id: string): Promise<Product | void> {
		const ENDPOINT = `${this.#URL_BASE}/products/${id}`;

		try {
			const DATA = await fetchData<ProductFromFakeStoreApi>(ENDPOINT);

			if (!DATA || DATA instanceof Response) {
				throw new Error('Failed to get all products');
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
	 * Creates a new product
	 * Sends a POST request to create a new product in the Fake Store API
	 * Posted data will not really insert into the database and just return a fake id.
	 * This is a limitation of the Fake Store API, which is intended for testing purposes only.
	 * @see https://github.com/keikaavousi/fake-store-api?tab=readme-ov-file#add-new-product
	 * @param product - The product to create
	 * @throws TypeError If the request fails or the response is not valid
	 * @returns A promise that resolves with the created product or undefined if not found.
	 */
	async create(product: Omit<Product, 'id'>): Promise<Product | void> {
		const ENDPOINT = `${this.#URL_BASE}/products`;

		try {
			const DATA = await fetchData<ProductFromFakeStoreApi>(ENDPOINT, {
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
	async update(product: Product): Promise<Product | void> {
		const { id } = product;
		const ENDPOINT = `${this.#URL_BASE}/products/${id}`;

		try {
			const DATA = await fetchData<ProductFromFakeStoreApi>(ENDPOINT, {
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
	async delete(id: string): Promise<void> {
		const ENDPOINT = `${this.#URL_BASE}/products/${id}`;

		try {
			const RESPONSE = await fetchData<ProductFromFakeStoreApi>(
				ENDPOINT,
				{
					method: 'DELETE',
				},
			);

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
	async getCategories(): Promise<
		(typeof ProductCategory)[keyof typeof ProductCategory][] | void
	> {
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
}
