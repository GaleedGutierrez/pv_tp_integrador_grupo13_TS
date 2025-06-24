import type { User } from '../domain/User';
import type { UserRepository } from '../domain/UserRepository';

export class UserRegister {
	readonly #repository: UserRepository;
	public constructor(repository: UserRepository) {
		this.#repository = repository;
	}

	public register(user: Omit<User, 'id'>): void | User {
		try {
			const NEW_USER = this.#repository.register(user);

			if (!NEW_USER) {
				throw new Error('Failed to register user');
			}

			return NEW_USER;
		} catch (error) {
			const MY_ERROR =
				error instanceof Error
					? error
					: new Error(
							'Unexpected error occurred during user registration',
						);

			throw MY_ERROR;
		}
	}
}
