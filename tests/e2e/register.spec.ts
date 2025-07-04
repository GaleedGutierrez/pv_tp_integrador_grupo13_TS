import type { User } from '@modules/users/domain/User';
import { expect, test } from '@playwright/test';

import { UserRepositoryMother } from './mother/UserRepositoryMother';
import { registerUser } from './utils/registerUser';

const mockUserRegisterData = {
	name: 'name testuser',
	lastname: 'lastname testuser',
	email: 'test@user.com',
	password: '123456',
	confirmPassword: '123456',
};

test.describe('User Registration', () => {
	const mockUser = UserRepositoryMother.create();

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Crear una cuenta' }).click();
		await page.waitForURL('/registrar');
	});

	test('Should register a new user successfully', async ({ page }) => {
		await registerUser(page, mockUser);

		await page
			.getByText('Registro exitoso, ahora podes iniciar sesión.')
			.waitFor();

		await page.waitForURL('/iniciar-sesion');

		const localStorageUsers = await page.evaluate(
			() =>
				JSON.parse(
					globalThis.localStorage.getItem('users') ?? '[]',
				) as User[],
		);

		const registeredUser = localStorageUsers.find(
			(user) => user.email === mockUserRegisterData.email,
		);

		if (!registeredUser) {
			throw new Error('Registered user not found in localStorage');
		}

		expect(registeredUser.name).toBe(mockUser.name);
		expect(registeredUser.lastname).toBe(mockUser.lastname);
		expect(registeredUser.email).toBe(mockUser.email);
		expect(registeredUser.password).toBe(mockUser.password);
	});

	test('Should show an error when trying to register with an existing email', async ({
		page,
	}) => {
		await page.evaluate((user) => {
			globalThis.localStorage.setItem('users', JSON.stringify([user]));
		}, mockUser);

		await registerUser(page, mockUser);

		await expect(
			page.getByText('Este correo electrónico ya ha sido registrado.'),
		).toBeVisible();
	});

	test('Should show an error when trying to register with invalid data', async ({
		page,
	}) => {
		await registerUser(page, {
			...mockUser,
			email: 'invalid@email',
			password: '123',
			confirmPassword: '1234',
		});

		await expect(
			page.getByText('Verifica el correo electrónico ingresado.'),
		).toBeVisible();
		await expect(
			page.getByText('La contraseña debe tener al menos 6 caracteres.'),
		).toBeVisible();
		await expect(
			page.getByText('Las contraseñas no coinciden.'),
		).toBeVisible();
	});
});
