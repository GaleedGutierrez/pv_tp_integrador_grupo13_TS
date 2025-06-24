import { AllProductsGetter } from '@modules/products/application/AllProductsGetter';
import { ProductCreator } from '@modules/products/application/ProductCreator';
import { ProductUpdater } from '@modules/products/application/ProductUpdater';
import { ApiProductsRepository } from '@modules/products/infrastructure/ApiProductsRepository';
import { UserRegister } from '@modules/users/application/UserRegister';
import { UserSearcherByEmail } from '@modules/users/application/UserSearcherByEmail';
import { ApiUserRepository } from '@modules/users/infrastructure/ApiUserRepository';
import type { JSX, ReactNode } from 'react';
import { useMemo } from 'react';

import { GlobalContext } from './global.context';

interface Properties {
	children: ReactNode;
}

const GlobalProvider = ({ children }: Properties): JSX.Element => {
	const productRepository = useMemo(() => new ApiProductsRepository(), []);
	const userRepository = useMemo(() => new ApiUserRepository(), []);

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
	const userRegister = useMemo(
		() => new UserRegister(userRepository),
		[userRepository],
	);
	const userSearcherByEmail = useMemo(
		() => new UserSearcherByEmail(userRepository),
		[userRepository],
	);

	const CONTEXT_VALUE = useMemo(
		() => ({
			productRepository,
			userRepository,
			getAllProducts,
			addNewProduct,
			updateProduct,
			userRegister,
			userSearcherByEmail,
		}),
		[
			productRepository,
			userRepository,
			getAllProducts,
			addNewProduct,
			updateProduct,
			userRegister,
			userSearcherByEmail,
		],
	);

	return (
		<GlobalContext.Provider value={CONTEXT_VALUE}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
