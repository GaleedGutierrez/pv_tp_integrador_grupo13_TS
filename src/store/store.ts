/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import favoritesReducer from '@sections/favorites/slice/favoritesSlice';

import productsReducer, {
	loadInitialProducts,
} from '@/sections/products/slices/productSlice';

import type { Dependencies } from './dependencies';
import { createDependencies } from './dependencies';

const listenerMiddleware = createListenerMiddleware();

const persistenceLocaleStorageMiddleware =
	(store: { getState: () => any }) =>
	(next: (argument0: any) => void) =>
	(action: any): void => {
		next(action);
		localStorage.setItem('reduxState', JSON.stringify(store.getState()));
	};

// Create dependencies instance
export const dependencies: Dependencies = createDependencies();

export const store = configureStore({
	reducer: { products: productsReducer, favorites: favoritesReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			// Configure thunk with extra argument if needed
			thunk: {
				extraArgument: dependencies,
			},
			// eslint-disable-next-line unicorn/prefer-spread
		}).concat(
			persistenceLocaleStorageMiddleware,
			listenerMiddleware.middleware,
		),
});

// This ensures that the initial products are loaded when the application starts
void store.dispatch(loadInitialProducts());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
