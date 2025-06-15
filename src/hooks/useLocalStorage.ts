import { useEffect, useState } from 'react';

type UseLocalStorage<T> = [T[], (newItems: T[]) => void];

export function useLocalStorage<T>(
	key: string,
	initialValue: T[] = [],
): UseLocalStorage<T> {
	function getStoredValue(): T[] {
		try {
			const STORED_DATA = localStorage.getItem(key);

			return STORED_DATA
				? (JSON.parse(STORED_DATA) as T[])
				: initialValue;
		} catch (error) {
			console.error(`Error parsing localStorage key "${key}":`, error);

			return initialValue;
		}
	}

	const [items, setItems] = useState<T[]>(getStoredValue);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(items));
	}, [key, items]);

	const updateItems = (newItems: T[]): void => {
		setItems(newItems);
	};

	return [items, updateItems];
}
