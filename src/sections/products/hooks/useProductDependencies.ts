import { useProductRepository } from '@hooks/useDependencies';
import type { Product } from '@modules/products/domain/Product';

interface ReturnProductActions {
	getAllProducts: () => Promise<void | Product[]>;
}

export const useProductDependencies = (): ReturnProductActions => {
	const productRepository = useProductRepository();
	const getAllProducts = async (): Promise<void | Product[]> => {
		try {
			const PRODUCTS = await productRepository.getAll();

			if (!PRODUCTS) {
				throw new Error('Failed to get all products');
			}

			return PRODUCTS;
		} catch (error) {
			if (error instanceof Error) {
				throw new TypeError(error.message);
			}
		}
	};

	return { getAllProducts };
};
