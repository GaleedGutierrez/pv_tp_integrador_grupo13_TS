import type { User } from '../domain/User';
import type { SessionData } from '../domain/UserSession';

export class UserSessionManager {
	readonly #STORAGE_KEY: string;

	constructor(storageKey: string) {
		this.#STORAGE_KEY = storageKey;
	}

	/**
	 * Create a new session for a user.
	 * @param user - The user object to store in the session.
	 * @param expirationHours - The number of hours until the session expires (default is 24 hours).
	 * @throws Error if the session cannot be created.
	 */
	public createSession(user: User, expirationHours = 24): void {
		const SESSION_DATA: SessionData = {
			user,
			timestamp: Date.now(),
			expiresAt: Date.now() + expirationHours * 60 * 60 * 1000,
		};

		try {
			localStorage.setItem(
				this.#STORAGE_KEY,
				JSON.stringify(SESSION_DATA),
			);
		} catch {
			throw new Error('Failed to create session');
		}
	}

	/**
	 * Obtains the current session data.
	 * @returns The session data if it exists and is valid, otherwise undefined.
	 * @throws Error if there is an error reading the session data.
	 */
	public getSession(): SessionData | undefined {
		try {
			const STORED = localStorage.getItem(this.#STORAGE_KEY);

			if (!STORED) {
				return undefined;
			}

			const SESSION_DATA = JSON.parse(STORED) as SessionData;

			if (Date.now() > SESSION_DATA.expiresAt) {
				this.destroySession();

				return undefined;
			}

			return SESSION_DATA;
		} catch (error) {
			console.error('Error reading session:', error);

			return undefined;
		}
	}

	/**
	 * Destroys the current session.
	 */
	public destroySession(): void {
		try {
			localStorage.removeItem(this.#STORAGE_KEY);
		} catch (error) {
			console.error('Error destroying session:', error);
		}
	}

	/**
	 * Verifica si hay una sesión válida
	 */
	public hasValidSession(): boolean {
		const session = this.getSession();

		return session !== undefined;
	}
}
