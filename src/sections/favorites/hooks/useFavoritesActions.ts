import { useAppDispatch } from '@hooks/useAppDispatch';
import type { Product } from '@modules/products/domain/Product';

import {
	addToFavorite as addFavorite,
	deleteFavoriteById as deleteFavorite,
} from '../slice/favoritesSlice';

interface ReturnFavoritesActions {
	addToFavorite: (product: Product) => void;
	deleteFavoriteById: (id: Product['id']) => void;
}

export const useFavoritesActions = (): ReturnFavoritesActions => {
	const dispatch = useAppDispatch();
	const addToFavorite = (product: Product): void => {
		dispatch(addFavorite(product));
	};
	const deleteFavoriteById = (id: number): void => {
		dispatch(deleteFavorite(id));
	};

	return { addToFavorite, deleteFavoriteById };
};
