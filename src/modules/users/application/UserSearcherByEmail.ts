import type { User } from '../domain/User';
import type { UserRepository } from '../domain/UserRepository';

export class UserSearcherByEmail {
	readonly #repository: UserRepository;
	public constructor(repository: UserRepository) {
		this.#repository = repository;
	}

	public searchByEmail(email: string): void | User {
		try {
			const FOUND_USER = this.#repository.searchByEmail(email);

			if (!FOUND_USER) {
				throw new Error(`User with email ${email} not found.`);
			}

			return FOUND_USER;
		} catch (error) {
			const MY_ERROR =
				error instanceof Error
					? error
					: new Error(
							'Unexpected error occurred during user search by email.',
						);

			throw MY_ERROR;
		}
	}
}
