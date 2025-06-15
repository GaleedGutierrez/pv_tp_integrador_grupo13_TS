import { useEffect, useRef, useState } from 'react';

interface Parameters<T> {
	readonly data?: T;
	readonly isLoading: boolean;
	readonly error?: Error;
	readonly fetchData: (url: string) => Promise<void>;
}

interface FetchProperties extends RequestInit {
	readonly controller?: AbortController;
}

const useFetch = <T>(
	url: string,
	options: FetchProperties = {},
): Parameters<T> => {
	const { controller } = options;
	const [data, setData] = useState<T>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error>();
	const DID_FETCH_REF = useRef(false);
	const CONTROLLER = controller ?? new AbortController();

	const fetchData = async (url: string): Promise<void> => {
		setError(undefined);
		setIsLoading(true);

		try {
			const RESPONSE = await fetch(url, {
				signal: CONTROLLER.signal,
				...options,
			});

			if (!RESPONSE.ok) {
				throw new Error('Error fetching data');
			}

			const JSON_DATA = (await RESPONSE.json()) as T;

			setData(JSON_DATA);
			DID_FETCH_REF.current = true;
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (DID_FETCH_REF.current) {
			return;
		}

		void fetchData(url);

		return (): void => {
			if (DID_FETCH_REF.current) {
				CONTROLLER.abort();
			}
		};
	}, [url]);

	return { data, isLoading, error, fetchData };
};

export default useFetch;
