import type { AllProductsGetter } from '@modules/products/application/AllProductsGetter';
import type { ProductCreator } from '@modules/products/application/ProductCreator';
import type { ProductUpdater } from '@modules/products/application/ProductUpdater';
import type { ApiProductsRepository } from '@modules/products/infrastructure/ApiProductsRepository';
import { createContext, useContext } from 'react';

interface GlobalContext {
	productRepository: ApiProductsRepository | undefined;
	getAllProducts: AllProductsGetter | undefined;
	addNewProduct: ProductCreator | undefined;
	updateProduct: ProductUpdater | undefined;
}

export const GlobalContext = createContext<GlobalContext>({
	productRepository: undefined,
	getAllProducts: undefined,
	addNewProduct: undefined,
	updateProduct: undefined,
});

export const useGlobalContext = (): GlobalContext => {
	const CONTEXT = useContext(GlobalContext);

	if (!CONTEXT.productRepository) {
		throw new Error(
			'GlobalContext must be used within a GlobalContextProvider',
		);
	}

	return CONTEXT;
};
