export const ProductCategory = {
	Electronics: 'electronics',
	Jewelry: 'jewelery',
	MensClothing: "men's clothing",
	WomensClothing: "women's clothing",
} as const satisfies Record<string, string>;
// export type TypeCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

/**
 * Defines the structure of a Product object.
 */
export interface Product {
	/** Unique identifier for the product */
	id: number;
	/** Display name of the product */
	title: string;
	/** Price as a string (e.g., "$19.99") */
	price: string;
	/** Detailed description of the product */
	description: string;
	/** Product category from predefined options */
	category: (typeof ProductCategory)[keyof typeof ProductCategory];
	/** URL or path to the product image */
	image: string;
	/** Optional rating information */
	rating?: {
		/** Average rating score */
		rate: number;
		/** Number of ratings received */
		count: number;
	};
}
