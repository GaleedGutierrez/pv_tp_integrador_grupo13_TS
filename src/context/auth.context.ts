import type { User } from '@modules/users/domain/User';
import { createContext, useContext } from 'react';

interface LoginResult {
	success: boolean;
	error?: string;
	user?: User;
}

interface AuthState {
	isLoggedIn: boolean;
	user: User | undefined;
	isLoading: boolean;
}

interface AuthActions {
	login: (email: string, password: string) => LoginResult;
	logout: () => void;
	checkSession: () => void;
	refreshSession: () => void;
}

interface AuthContext {
	auth: AuthState;
	authActions: AuthActions;
}

export const AuthContext = createContext<AuthContext>({
	auth: {
		isLoggedIn: false,
		user: undefined,
		isLoading: true,
	},
	authActions: {
		login: () => ({ success: false, error: 'Context not initialized' }),
		logout: () => {
			// Default implementation - to be overridden by provider
		},
		checkSession: () => {
			// Default implementation - to be overridden by provider
		},
		refreshSession: () => {
			// Default implementation - to be overridden by provider
		},
	},
});

export const useAuthContext = (): AuthContext => {
	const CONTEXT = useContext(AuthContext);

	return CONTEXT;
};
