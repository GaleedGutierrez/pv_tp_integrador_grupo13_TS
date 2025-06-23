import type { Product } from '@/modules/products/domain/Product';

import type { TypeProductCategory } from './ProductCategory';

/**
 * Interface for product data access
 */
export interface ProductRepository {
	/** Searches for all products */
	getAll: () => Promise<void | Product[]>;
	/** Searches for a product by ID */
	searchById: (id: number) => Promise<void | Product>;
	/** Creates a new product */
	save: (
		product: Omit<Product, 'id' | 'rating'>,
	) => Promise<void | Omit<Product, 'rating'>>;
	/** Updates an existing product */
	update: (
		product: Omit<Product, 'rating'>,
	) => Promise<void | Omit<Product, 'rating'>>;
	/** Deletes a product by ID */
	delete: (id: number) => Promise<void>;
	/** Retrieves all product categories */
	getAllCategories: () => Promise<TypeProductCategory[] | void>;
	/** Retrieves all product categories */
	getByCategory: (category: TypeProductCategory) => Promise<Product[] | void>;
}
