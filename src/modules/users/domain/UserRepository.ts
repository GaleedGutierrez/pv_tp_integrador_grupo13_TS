import type { User } from './User';

/**
 * Interface for user data access
 */
export interface UserRepository {
	/** Creates a new user */
	register: (user: Omit<User, 'id'>) => void | User;
	/** Searches for a user by ID */
	searchByEmail: (email: string) => void | User;
	// Si hay tiempo agrego esto
	// /** Updates an existing user */
	// update: (user: User) => void | User;
	// /** Deletes a user by ID */
	// delete: (id: string) => void | User;
}
