export const ProductCategory = {
	Electronics: 'electronics',
	Jewelry: 'jewelery',
	MensClothing: "men's clothing",
	WomensClothing: "women's clothing",
} as const satisfies Record<string, string>;
export type TypeProductCategory =
	(typeof ProductCategory)[keyof typeof ProductCategory];
