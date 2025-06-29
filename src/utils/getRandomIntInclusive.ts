export function getRandomIntInclusive(min: number, max: number): number {
	const MIN_CEILED = Math.ceil(min);
	const MAX_FLOORED = Math.floor(max);

	return Math.floor(
		Math.random() * (MAX_FLOORED - MIN_CEILED + 1) + MIN_CEILED,
	); // The maximum is inclusive and the minimum is inclusive
}
