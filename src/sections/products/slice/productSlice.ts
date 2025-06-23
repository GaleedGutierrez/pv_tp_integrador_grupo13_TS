/* eslint-disable security/detect-object-injection */
import { keysLocalStorage } from '@constants/keysLocalStorage';
import { AllProductsGetter } from '@modules/products/application/AllProductsGetter';
import { productToPlainObject } from '@modules/products/application/ProductToPlainObject';
import type { Product } from '@modules/products/domain/Product';
import { ApiProductsRepository } from '@modules/products/infrastructure/ApiProductsRepository';
import {
	createAsyncThunk,
	createSlice,
	current,
	type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

const productRepository = new ApiProductsRepository();
const getAllProducts = new AllProductsGetter(productRepository);
const DEFAULT_STATE: Product[] = [];

// Create async thunk for loading initial products
export const loadInitialProducts = createAsyncThunk(
	'products/loadInitial',
	async (): Promise<Product[]> => {
		const PRODUCTS = await getAllProducts.get();

		if (!PRODUCTS) {
			throw new Error('Failed to load products from API');
		}

		return PRODUCTS.map(
			(product: Product): Product => productToPlainObject(product),
		);
	},
	{
		// ✅ Condition to check if products are already loaded
		condition: (_argument, { getState }) => {
			const STATE = getState() as RootState;

			// If products are already loaded, skip the action
			if (STATE.products.items.length > 0) {
				return false;
			}

			// Check localStorage for persisted state
			const PERSISTED_STATE = localStorage.getItem(
				keysLocalStorage.redux.globalState,
			);

			if (PERSISTED_STATE) {
				try {
					const PARSED_STATE = JSON.parse(
						PERSISTED_STATE,
					) as Partial<RootState>;

					if (
						PARSED_STATE.products?.items &&
						Array.isArray(PARSED_STATE.products.items) &&
						PARSED_STATE.products.items.length > 0
					) {
						return false;
					}
				} catch (error) {
					console.error('Error parsing localStorage:', error);
				}
			}

			return true;
		},
	},
);

const getInitialState = (): Product[] => {
	const PERSISTED_STATE = localStorage.getItem(
		keysLocalStorage.redux.globalState,
	);

	if (PERSISTED_STATE) {
		try {
			const PARSED_STATE = JSON.parse(
				PERSISTED_STATE,
			) as Partial<RootState>;

			if (
				PARSED_STATE.products?.items &&
				Array.isArray(PARSED_STATE.products.items)
			) {
				return PARSED_STATE.products.items;
			}
		} catch (error) {
			console.error('Error parsing persisted state:', error);
		}
	}

	return DEFAULT_STATE;
};

interface ProductsState {
	items: Product[];
	loading: boolean;
	error: string | undefined;
}

const initialState: ProductsState = {
	items: getInitialState(),
	loading: false,
	error: undefined,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<Omit<Product, 'rating'>>) => {
			const CURRENT_PRODUCTS = current(state.items);
			const LAST_PRODUCT = CURRENT_PRODUCTS.findLast(
				(product) => product.id,
			);
			const NEW_PRODUCT_ID = LAST_PRODUCT ? LAST_PRODUCT.id + 1 : 1;
			const { id: _ignored, ...payloadWithoutId } = action.payload;
			const NEW_PRODUCT = {
				id: NEW_PRODUCT_ID,
				...payloadWithoutId,
			};

			state.items = [...state.items, NEW_PRODUCT];
		},
		deleteProductById: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(
				(product) => product.id !== action.payload,
			);
		},
		updateProduct: (state, action: PayloadAction<Product>) => {
			const index = state.items.findIndex(
				(product) => product.id === action.payload.id,
			);

			if (index !== -1) {
				state.items[index] = action.payload;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadInitialProducts.pending, (state) => {
				state.loading = true;
				state.error = undefined;
			})
			.addCase(loadInitialProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(loadInitialProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to load products';
			});
	},
});

export const { addProduct, deleteProductById, updateProduct } =
	productsSlice.actions;
export default productsSlice.reducer;
