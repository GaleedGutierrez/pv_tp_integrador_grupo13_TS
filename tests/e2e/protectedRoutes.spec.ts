import { expect, test } from '@playwright/test';

test.describe('Protected routes', () => {
	test('Should redirect to login when trying to access home without being logged in', async ({
		page,
	}) => {
		await page.goto('/');
		await page.waitForURL('/iniciar-sesion');
		await expect(
			page.getByText(
				'Ingresa tu correo electrónico y contraseña a continuación para iniciar sesión.',
			),
		).toBeVisible();
	});

	test('Should redirect to login when trying to access favorites without being logged in', async ({
		page,
	}) => {
		await page.goto('/favoritos');
		await page.waitForURL('/iniciar-sesion');
		await expect(
			page.getByText(
				'Ingresa tu correo electrónico y contraseña a continuación para iniciar sesión.',
			),
		).toBeVisible();
	});
	test('Should redirect to login when trying to access a product without being logged in', async ({
		page,
	}) => {
		await page.goto('/producto/1');
		await page.waitForURL('/iniciar-sesion');
		await expect(
			page.getByText(
				'Ingresa tu correo electrónico y contraseña a continuación para iniciar sesión.',
			),
		).toBeVisible();
	});
});
