import type { Product as InterfaceProduct } from '@models/domain/Product.model';
import type { ProductFromFakeStoreApi } from '@models/domain/ProductFromFakeStoreApi.model';

/**
 * Creates a new Product instance
 * @returns The created product
 */
class Product implements InterfaceProduct {
	public title;
	public price;
	public description;
	public category;
	public image;
	public id;
	public rating;

	/**
	 * Creates a new Product instance.
	 * @param parameters - The parameters to initialize the product.
	 */
	constructor(parameters: ProductFromFakeStoreApi) {
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

export default Product;
