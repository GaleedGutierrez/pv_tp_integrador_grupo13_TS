import { expect, test } from '@playwright/test';

import type { SessionData } from '@/modules/users/domain/UserSession';

import { UserRepositoryMother } from './mother/UserRepositoryMother';
import { fillLogin } from './utils/fillLogin';
import { registerUser } from './utils/registerUser';

test.describe('Login user', () => {
	const mockUser = UserRepositoryMother.create();

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Crear una cuenta' }).click();
		await page.waitForURL('/registrar');
		await registerUser(page, mockUser);
		await page.waitForURL('/iniciar-sesion');
	});

	test('Should login with valid credentials', async ({ page }) => {
		await fillLogin(page, mockUser);

		await page.waitForURL('/');

		const localStorageSessionUser = await page.evaluate(
			() =>
				JSON.parse(
					globalThis.localStorage.getItem('sessionUser') ?? '{}',
				) as SessionData | { user: typeof mockUser | undefined },
		);

		if (!localStorageSessionUser.user) {
			throw new Error('Session user not found in localStorage');
		}

		expect(localStorageSessionUser.user.email).toBe(mockUser.email);
		expect(localStorageSessionUser.user.name).toBe(mockUser.name);
		expect(localStorageSessionUser.user.lastname).toBe(mockUser.lastname);
		expect(localStorageSessionUser.user.password).toBe(mockUser.password);
	});

	test('Should rehydrate session user from localStorage on page reload', async ({
		page,
	}) => {
		await fillLogin(page, mockUser);

		await page.waitForURL('/');

		await expect(
			page.getByText(
				'Ingresa tu correo electrónico y contraseña a continuación para iniciar sesión.',
			),
		).not.toBeVisible();
		await expect(
			page.getByText(`Bienvenido, ${mockUser.name}`),
		).toBeVisible();

		await page.reload();

		await expect(
			page.getByText(
				'Ingresa tu correo electrónico y contraseña a continuación para iniciar sesión.',
			),
		).not.toBeVisible();
		await expect(
			page.getByText(`Bienvenido, ${mockUser.name}`),
		).toBeVisible();
	});

	test('Should redirect to home when trying to access login page while logged in', async ({
		page,
	}) => {
		await fillLogin(page, mockUser);
		await page.goto('/iniciar-sesion');
		await page.waitForURL('/iniciar-sesion');
		await page.waitForURL('/');
		await expect(
			page.getByText(
				'Ingresa tu correo electrónico y contraseña a continuación para iniciar sesión.',
			),
		).not.toBeVisible();
		await expect(
			page.getByText(`Bienvenido, ${mockUser.name}`),
		).toBeVisible();
	});

	test('Should show an error when trying to login with invalid credentials', async ({
		page,
	}) => {
		await page
			.getByRole('textbox', { name: 'Correo Electrónico' })
			.fill('invalid@email.com');
		await page
			.getByRole('textbox', { name: 'Contraseña' })
			.fill('incorrect-password');
		await page.getByRole('button', { name: 'Iniciar sesión' }).click();

		await expect(
			page
				.getByText('Credenciales inválidas. Inténtalo de nuevo.')
				.first(),
		).toBeVisible();
		await page
			.getByText('Credenciales inválidas. Inténtalo de nuevo.')
			.last()
			.waitFor();
	});
});

test.describe('Logout user', () => {
	const mockUser = UserRepositoryMother.create();

	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: 'Crear una cuenta' }).click();
		await page.waitForURL('/registrar');
		await registerUser(page, mockUser);
		await page.waitForURL('/iniciar-sesion');
	});

	test('Should logout user and clear session data', async ({ page }) => {
		await fillLogin(page, mockUser);

		await page.waitForURL('/');
		await page.getByText(`Bienvenido, ${mockUser.name}`).waitFor();

		await page.getByRole('button', { name: 'Mi cuenta' }).click();
		await page.getByRole('button', { name: 'Cerrar sesión' }).click();

		await page.waitForURL('/iniciar-sesion');

		const localStorageSessionUser = await page.evaluate(() =>
			globalThis.localStorage.getItem('sessionUser'),
		);

		expect(localStorageSessionUser).toBeNull();
	});
});
