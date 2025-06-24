import { useAppDispatch } from '@hooks/useAppDispatch';
import type { Product } from '@modules/products/domain/Product';

import {
	addProduct,
	deleteProductById,
	updateProduct as updateProductSlice,
} from '../slices/productSlice';

interface ReturnProductActions {
	deleteProduct: (id: number) => void;
	addNewProduct: (product: Omit<Product, 'rating'>) => void;
	updateProduct: (product: Omit<Product, 'rating'>) => void;
}

export const useProductActions = (): ReturnProductActions => {
	const dispatch = useAppDispatch();

	const addNewProduct = (product: Omit<Product, 'rating'>): void => {
		dispatch(addProduct(product));
	};

	const updateProduct = (product: Omit<Product, 'rating'>): void => {
		dispatch(updateProductSlice(product));
	};

	const deleteProduct = (id: number): void => {
		dispatch(deleteProductById(id));
	};

	return { deleteProduct, addNewProduct, updateProduct };
};
