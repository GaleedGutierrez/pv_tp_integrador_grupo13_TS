import type { AllProductsGetter } from '@modules/products/application/AllProductsGetter';
import type { ProductCreator } from '@modules/products/application/ProductCreator';
import type { ProductUpdater } from '@modules/products/application/ProductUpdater';
import type { ApiProductsRepository } from '@modules/products/infrastructure/ApiProductsRepository';
import type { UserRegister } from '@modules/users/application/UserRegister';
import type { UserSearcherByEmail } from '@modules/users/application/UserSearcherByEmail';
import type { ApiUserRepository } from '@modules/users/infrastructure/ApiUserRepository';
import { createContext, useContext } from 'react';

import type { UserAuthenticator } from '@/modules/users/application/UserAuthenticator';
import type { UserSessionManager } from '@/modules/users/application/UserSessionManager';

interface GlobalContext {
	// Products
	productRepository: ApiProductsRepository | undefined;
	getAllProducts: AllProductsGetter | undefined;
	addNewProduct: ProductCreator | undefined;
	updateProduct: ProductUpdater | undefined;

	// Users
	userRepository: ApiUserRepository | undefined;
	userRegister: UserRegister | undefined;
	userSearcherByEmail: UserSearcherByEmail | undefined;
	userAuthenticator: UserAuthenticator | undefined;
	userSessionManager: UserSessionManager | undefined;
}

export const GlobalContext = createContext<GlobalContext>({
	productRepository: undefined,
	getAllProducts: undefined,
	addNewProduct: undefined,
	updateProduct: undefined,
	userRepository: undefined,
	userRegister: undefined,
	userSearcherByEmail: undefined,
	userAuthenticator: undefined,
	userSessionManager: undefined,
});

export const useGlobalContext = (): GlobalContext => {
	const CONTEXT = useContext(GlobalContext);

	if (
		!CONTEXT.productRepository ||
		!CONTEXT.getAllProducts ||
		!CONTEXT.addNewProduct ||
		!CONTEXT.updateProduct ||
		!CONTEXT.userRepository ||
		!CONTEXT.userRegister ||
		!CONTEXT.userSearcherByEmail ||
		!CONTEXT.userAuthenticator ||
		!CONTEXT.userSessionManager
	) {
		throw new Error(
			'GlobalContext must be used within a GlobalContextProvider',
		);
	}

	return CONTEXT;
};
