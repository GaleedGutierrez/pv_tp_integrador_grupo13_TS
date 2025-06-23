import type { ApiProduct } from '../infrastructure/ApiProductsRepository';
import type { TypeProductCategory } from './ProductCategory';

/** Represents the rating information for a product. */
interface Rating {
	/** Average rating score */
	rate: number;
	/** Number of ratings received */
	count: number;
}

/**
 * Creates a new Product instance
 * @returns The created product
 */
export class Product {
	/** Unique identifier for the product */
	public id: number;
	/** Display name of the product */
	public title: string;
	/** Price as a string (e.g., "$19.99") */
	public price: string;
	/** Detailed description of the product */
	public description: string;
	/** Product category from predefined options */
	public category: TypeProductCategory;
	/** URL or path to the product image */
	public image: string;
	/** Represents the rating information for a product. */
	public rating?: Rating;

	/**
	 * Creates a new Product instance.
	 * @param parameters - The parameters to initialize the product.
	 */
	public constructor(parameters: ApiProduct) {
		const { id, title, price, description, category, image, rating } =
			parameters;

		this.id = id;
		this.title = title;
		this.price = new Intl.NumberFormat(globalThis.navigator.language, {
			style: 'currency',
			currency: 'USD',
		}).format(price);
		this.description = description;
		this.category = category;
		this.image = image;
		this.rating = rating;
	}
}
