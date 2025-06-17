import { keysLocalStorage } from '@constants/keysLocalStorage';
import type { Product } from '@modules/products/domain/Product';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

const DEFAULT_STATE: Product[] = [];
const initialState: Product[] = ((): Product[] => {
	const PERSISTED_STATE = localStorage.getItem(
		keysLocalStorage.redux.globalState,
	);

	if (PERSISTED_STATE) {
		try {
			const PARSED_STATE = JSON.parse(
				PERSISTED_STATE,
			) as Partial<RootState>;

			if (
				!PARSED_STATE.favorites ||
				!Array.isArray(PARSED_STATE.favorites)
			) {
				throw new Error(
					'Invalid products state format. Expected an array.',
				);
			}

			return PARSED_STATE.favorites;
		} catch (error) {
			console.error(
				'Error parsing persisted state:',
				error,
				'\n' + 'Using default state instead.',
			);
			console.error();

			return DEFAULT_STATE;
		}
	}

	return DEFAULT_STATE;
})();

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addToFavorite: (state, action: PayloadAction<Product>) => {
			const PRODUCT = action.payload;

			return [...state, PRODUCT];
		},

		deleteFavoriteById: (state, action: PayloadAction<Product['id']>) => {
			const PRODUCT_ID = action.payload;

			return state.filter((product) => product.id !== PRODUCT_ID);
		},
	},
});

export const { addToFavorite, deleteFavoriteById } = favoritesSlice.actions;
export default favoritesSlice.reducer;
