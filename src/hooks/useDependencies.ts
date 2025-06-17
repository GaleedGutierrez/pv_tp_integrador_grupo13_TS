import type { ProductRepository } from '@modules/products/domain/ProductRepository';
import type { Dependencies } from '@store/dependencies';
import { dependencies } from '@store/store';

/**
 * Hook to access application dependencies
 * This provides a clean way to access repositories in components and thunks
 */
export const useDependencies = (): Dependencies => dependencies;

/**
 * Hook to access the product repository specifically
 * Convenience hook for the most commonly used repository
 */
export const useProductRepository = (): ProductRepository =>
	dependencies.productRepository;
