import { useAppDispatch } from '@hooks/useAppDispatch';

// import { useProductDependencies } from '../hooks/useProductDependencies';
import {
	// addAllProducts as addAllOfProducts,
	deleteProductById,
} from '../slice/productSlice';

interface ReturnProductActions {
	deleteProduct: (id: number) => void;
	// addAllProducts: () => Promise<void>;
}

// const { getAllProducts } = useProductDependencies();

export const useProductActions = (): ReturnProductActions => {
	const dispatch = useAppDispatch();
	const deleteProduct = (id: number): void => {
		dispatch(deleteProductById(id));
	};
	// const allAllProducts = async (): Promise<void> => {
	// 	try {
	// 		const PRODUCTS = await getAllProducts();

	// 		if (!PRODUCTS) {
	// 			throw new Error('Failed to fetch products');
	// 		}

	// 		dispatch(addAllOfProducts(PRODUCTS));
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			throw new TypeError(error.message);
	// 		}
	// 	}
	// };

	return { deleteProduct /*addAllProducts: allAllProducts*/ };
};
