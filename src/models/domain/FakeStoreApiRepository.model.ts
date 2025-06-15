import type Product from '@domain/Product';

import type { ProductCategory } from './Product.model';

/**
 * Interface for product data access
 */
export interface ProductRepository {
	/** Searches for all products */
	getAll: () => Promise<void | Product[]>;
	/** Searches for a product by ID */
	searchById: (id: string) => Promise<void | Product>;
	/** Creates a new product */
	create: (product: Omit<Product, 'id'>) => Promise<void | Product>;
	/** Updates an existing product */
	update: (product: Product) => Promise<void | Product>;
	/** Deletes a product by ID */
	delete: (id: string) => Promise<void>;
	/** Retrieves all product categories */
	getCategories: () => Promise<
		(typeof ProductCategory)[keyof typeof ProductCategory][] | void
	>;
	/** Retrieves all product categories */
	// getByCategory: (category: ProductCategory) => Promise<Product[] | void>;
}
