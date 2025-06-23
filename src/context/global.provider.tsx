import type { JSX, ReactNode } from 'react';
import { useMemo } from 'react';

import { AllProductsGetter } from '@/modules/products/application/AllProductsGetter';
import { ProductCreator } from '@/modules/products/application/ProductCreator';
import { ApiProductsRepository } from '@/modules/products/infrastructure/ApiProductsRepository';

import { GlobalContext } from './global.context';

interface Properties {
	children: ReactNode;
}

const GlobalProvider = ({ children }: Properties): JSX.Element => {
	const productRepository = useMemo(() => new ApiProductsRepository(), []);
	const getAllProducts = useMemo(
		() => new AllProductsGetter(productRepository),
		[productRepository],
	);
	const addNewProduct = useMemo(
		() => new ProductCreator(productRepository),
		[productRepository],
	);
	const CONTEXT_VALUE = useMemo(
		() => ({ productRepository, getAllProducts, addNewProduct }),
		[productRepository, getAllProducts, addNewProduct],
	);

	return (
		<GlobalContext.Provider value={CONTEXT_VALUE}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
