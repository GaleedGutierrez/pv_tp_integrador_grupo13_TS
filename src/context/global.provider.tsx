import { AllProductsGetter } from '@modules/products/application/AllProductsGetter';
import { ProductCreator } from '@modules/products/application/ProductCreator';
import { ProductUpdater } from '@modules/products/application/ProductUpdater';
import { ApiProductsRepository } from '@modules/products/infrastructure/ApiProductsRepository';
import type { JSX, ReactNode } from 'react';
import { useMemo } from 'react';

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
	const updateProduct = useMemo(
		() => new ProductUpdater(productRepository),
		[productRepository],
	);
	const CONTEXT_VALUE = useMemo(
		() => ({
			productRepository,
			getAllProducts,
			addNewProduct,
			updateProduct,
		}),
		[productRepository, getAllProducts, addNewProduct, updateProduct],
	);

	return (
		<GlobalContext.Provider value={CONTEXT_VALUE}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
