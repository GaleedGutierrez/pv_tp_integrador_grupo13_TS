import { keysLocalStorage } from '@/constants/keysLocalStorage';

import { User } from '../domain/User';
import type { UserRepository } from '../domain/UserRepository';

/**
 * Implementation of UserRepository using the [name of the API]
 * This class provides methods to interact with the [name of the API] for user data.
 */
export class ApiUserRepository implements UserRepository {
	/**
	 * Save a new user
	 * Sends a POST request to save a new user in the [name of the API]
	 * @param user - The user to register, It should cointain the following properties:
	 * - email: The email address of the user (required)
	 * - password: The password for the user account (required)
	 * @throws Error If the request fails or the response is not valid
	 * @returns A promise that resolves with the registered user.
	 * This method is temporally implemented using localStorage until the API is available.
	 */
	public register(user: Omit<User, 'id'>): void | User {
		const USERS_LOCALE_STORAGE = JSON.parse(
			localStorage.getItem(keysLocalStorage.users) ?? '[]',
		) as User[];
		const IS_USER_EXIST = USERS_LOCALE_STORAGE.some(
			(existingUser) => existingUser.email === user.email,
		);

		try {
			if (IS_USER_EXIST) {
				throw new Error(
					`User with email ${user.email} already exists.`,
				);
			}

			return new User({
				id: globalThis.crypto.randomUUID(),
				...user,
			});
		} catch (error) {
			const MY_ERROR =
				error instanceof Error
					? error
					: new Error('Failed to register user.');

			throw MY_ERROR;
		}
	}

	/**
	 * Search a user by email.
	 * Sends a GET request to search a user by email in the [name of the API].
	 * @param email - The user email address to search for.
	 * @throws Error If the request fails or the response is not valid
	 * @returns A promise that resolves with the user found.
	 * This method is temporally implemented using localStorage until the API is available.
	 */
	public searchByEmail(email: string): void | User {
		const USERS_LOCALE_STORAGE = JSON.parse(
			localStorage.getItem(keysLocalStorage.users) ?? '[]',
		) as User[];
		const FOUND_USER = USERS_LOCALE_STORAGE.find(
			(existingUser) => existingUser.email === email,
		);

		try {
			if (!FOUND_USER) {
				throw new Error(`User with email ${email} not found.`);
			}

			return FOUND_USER;
		} catch (error) {
			const MY_ERROR =
				error instanceof Error
					? error
					: new Error('Failed to search user by email.');

			throw MY_ERROR;
		}
	}
}
