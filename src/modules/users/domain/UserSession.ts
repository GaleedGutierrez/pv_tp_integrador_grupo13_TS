import type { User } from './User';

export interface SessionData {
	user: User;
	timestamp: number;
	expiresAt: number;
}
