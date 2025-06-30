import type { User } from '../domain/User';
import type { UserRepository } from '../domain/UserRepository';

export class UserAuthenticator {
	readonly #repository: UserRepository;
	public constructor(repository: UserRepository) {
		this.#repository = repository;
	}

	/**
	 * Authenticate user by email and password.
	 * Returns the user if authentication is successful, otherwise returns undefined.
	 */
	public authenticate(email: string, password: string): User | undefined {
		try {
			const USER = this.#repository.findByEmail(email);

			if (!USER) {
				return undefined;
			}

			const IS_VALID_PASSWORD = this.#validatePassword(
				password,
				USER.password,
			);

			return IS_VALID_PASSWORD ? USER : undefined;
		} catch (error) {
			console.error('Authentication error:', error);

			return undefined;
		}
	}

	/**
	 * Validates the session by checking if the user exists in the repository.
	 * This method assumes that the user ID is a valid UUID format.
	 * @param userId - The unique identifier of the user session, formatted as a UUID.
	 * @returns The user if the session is valid, otherwise undefined.
	 * @throws Error if the user ID is not in the correct format or if an error occurs during validation.
	 */
	public validateSession(
		userId: `${string}-${string}-${string}-${string}-${string}`,
	): User | undefined {
		try {
			const USER = this.#repository.findById(userId);

			if (!USER) {
				return undefined;
			}

			// Aquí podrías agregar lógica adicional para validar la sesión, como verificar un token JWT o una cookie
			// Por ahora, simplemente retornamos el usuario si existe
			return USER;
		} catch (error) {
			console.error('Session validation error:', error);
		}
	}

	/**
	 * Validates the password against the stored user password.
	 * This is a simple comparison, but you could use bcrypt or another hashing library for better security.
	 * @param inputPassword - The password input from the user.
	 * @param userPassword - The stored password of the user.
	 * @returns true if the passwords match, false otherwise.
	 */
	#validatePassword(inputPassword: string, userPassword: string): boolean {
		return inputPassword === userPassword;
	}
}
