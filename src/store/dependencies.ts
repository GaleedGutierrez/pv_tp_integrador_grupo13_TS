import type { ProductRepository } from '@modules/products/domain/ProductRepository';
import { ApiProductsRepository } from '@modules/products/infrastructure/ApiProductsRepository';

/**
 * Service container that holds all application dependencies
 * This follows the Dependency Injection pattern for better testability and maintainability
 */
export interface Dependencies {
	productRepository: ProductRepository;
}

/**
 * Create production dependencies
 * All real implementations are instantiated here
 */
export const createDependencies = (): Dependencies => ({
	productRepository: new ApiProductsRepository(),
});

// /**
//  * Global dependencies instance
//  * This can be overridden in tests with mock implementations
//  */
// export let dependencies: Dependencies = createDependencies();

// /**
//  * Override dependencies (useful for testing)
//  * @param newDependencies - The new dependencies to use
//  */
// export const setDependencies = (newDependencies: Dependencies): void => {
// 	dependencies = newDependencies;
// };
