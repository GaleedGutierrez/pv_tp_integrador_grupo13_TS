import { expect, test } from '@playwright/test';

import { UserRepositoryMother } from './mother/UserRepositoryMother';
import { fillLogin } from './utils/fillLogin';
import { registerUser } from './utils/registerUser';

// Nota: no voy a moquear la información de los productos ya que necesito hacer el test lo más realista posible.
const mockUser = UserRepositoryMother.create();

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Crear una cuenta' }).click();
	await page.waitForURL('/registrar');
	await registerUser(page, mockUser);
	await page.waitForURL('/iniciar-sesion');
	await fillLogin(page, mockUser);
	await page.waitForURL('/');
});

test.describe('Favorites', () => {
	test('Should add favorite product', async ({ page }) => {
		await expect(
			page.getByText(
				"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
			),
		).toBeVisible();

		await page
			.getByRole('button', {
				name: 'Agregar a favoritos',
			})
			.first()
			.click();
		await expect(
			page.getByText('Producto agregado a favoritos.'),
		).toBeVisible();

		await page.getByRole('link', { name: 'Favoritos' }).click();
		await page.waitForURL('/favoritos');
		await page.reload();

		await expect(
			page.getByText(
				"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
			),
		).toBeVisible();
	});

	test('Should remove favorite product', async ({ page }) => {
		await expect(
			page.getByText(
				"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
			),
		).toBeVisible();

		await page
			.getByRole('button', {
				name: 'Agregar a favoritos',
			})
			.first()
			.click();

		await expect(
			page.getByText('Producto agregado a favoritos.'),
		).toBeVisible();

		await page.getByRole('link', { name: 'Favoritos' }).click();
		await page.waitForURL('/favoritos');
		await page.reload();

		await expect(
			page.getByText(
				"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
			),
		).toBeVisible();

		await page
			.getByRole('button', {
				name: 'Quitar de favoritos',
			})
			.first()
			.click();

		await expect(
			page.getByText('Producto quitado de favoritos.'),
		).toBeVisible();
		await expect(
			page.getByText('No tienes productos favoritos'),
		).toBeVisible();

		await page.reload();

		await expect(
			page.getByText('No tienes productos favoritos'),
		).toBeVisible();
	});
});
