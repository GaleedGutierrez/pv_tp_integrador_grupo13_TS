import type { User } from '@/modules/users/domain/User';

export const UserRepositoryMother = {
	create: (overrides?: Partial<User>): User => ({
		id: '68937dd2-aad1-4233-81ba-a0080966d4ab',
		name: 'Registered User',
		lastname: 'Registered User Lastname',
		email: 'test@user.com',
		password: '123456',
		...overrides,
	}),
};
