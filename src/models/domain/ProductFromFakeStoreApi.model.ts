import type { ProductCategory } from './Product.model';

/**
 * ProductFromFakeStoreApi - Represents a student in the system.
 */
export interface ProductFromFakeStoreApi {
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
