import { expect, test } from '@playwright/test';

import type { RootState } from '@/store/store';

import { ProductRepositoryMother } from './mother/ProductRepositoryMother';
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

test.describe('Initial state products', () => {
	test('Should have 20 products in localStorage', async ({ page }) => {
		await expect(
			page.getByText(
				"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
			),
		).toBeVisible();

		const localStorageReduxState = await page.evaluate(() =>
			globalThis.localStorage.getItem('reduxState'),
		);

		if (!localStorageReduxState) {
			throw new Error('Redux state not found in localStorage');
		}

		const parsedReduxState = JSON.parse(
			localStorageReduxState,
		) as RootState;

		if (parsedReduxState.products.items.length === 0) {
			throw new Error('Products not found in Redux state');
		}

		expect(parsedReduxState.products.items).toHaveLength(20);
	});

	test("Should have 6 products in women's clothing", async ({ page }) => {
		await expect(
			page.getByText(
				"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
			),
		).toBeVisible();

		const localStorageReduxState = await page.evaluate(() =>
			globalThis.localStorage.getItem('reduxState'),
		);

		if (!localStorageReduxState) {
			throw new Error('Redux state not found in localStorage');
		}

		const parsedReduxState = JSON.parse(
			localStorageReduxState,
		) as RootState;

		if (parsedReduxState.products.items.length === 0) {
			throw new Error('Products not found in Redux state');
		}

		const womenClothingProducts = parsedReduxState.products.items.filter(
			(product) => product.category === "women's clothing",
		);

		expect(womenClothingProducts).toHaveLength(6);
	});

	test("Should have 4 products in men's clothing", async ({ page }) => {
		await expect(
			page.getByText(
				'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
			),
		).toBeVisible();

		const localStorageReduxState = await page.evaluate(() =>
			globalThis.localStorage.getItem('reduxState'),
		);

		if (!localStorageReduxState) {
			throw new Error('Redux state not found in localStorage');
		}

		const parsedReduxState = JSON.parse(
			localStorageReduxState,
		) as RootState;

		if (parsedReduxState.products.items.length === 0) {
			throw new Error('Products not found in Redux state');
		}

		const menClothingProducts = parsedReduxState.products.items.filter(
			(product) => product.category === "men's clothing",
		);

		expect(menClothingProducts).toHaveLength(4);
	});

	// I know "jewelery" is spelled incorrectly, but it's the way it is in the API.
	test('Should have 4 products in jewelery', async ({ page }) => {
		await expect(
			page.getByText(
				"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
			),
		).toBeVisible();

		const localStorageReduxState = await page.evaluate(() =>
			globalThis.localStorage.getItem('reduxState'),
		);

		if (!localStorageReduxState) {
			throw new Error('Redux state not found in localStorage');
		}

		const parsedReduxState = JSON.parse(
			localStorageReduxState,
		) as RootState;

		if (parsedReduxState.products.items.length === 0) {
			throw new Error('Products not found in Redux state');
		}

		const menClothingProducts = parsedReduxState.products.items.filter(
			(product) => product.category === 'jewelery',
		);

		expect(menClothingProducts).toHaveLength(4);
	});

	test('Should have 6 products in electronics', async ({ page }) => {
		await expect(
			page.getByText(
				'WD 2TB Elements Portable External Hard Drive - USB 3.0',
			),
		).toBeVisible();

		const localStorageReduxState = await page.evaluate(() =>
			globalThis.localStorage.getItem('reduxState'),
		);

		if (!localStorageReduxState) {
			throw new Error('Redux state not found in localStorage');
		}

		const parsedReduxState = JSON.parse(
			localStorageReduxState,
		) as RootState;

		if (parsedReduxState.products.items.length === 0) {
			throw new Error('Products not found in Redux state');
		}

		const menClothingProducts = parsedReduxState.products.items.filter(
			(product) => product.category === 'electronics',
		);

		expect(menClothingProducts).toHaveLength(6);
	});
});

test.describe('Details of products', () => {
	test('Should navigate to product details', async ({ page }) => {
		await expect(
			page.getByText(
				"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
			),
		).toBeVisible();

		await page
			.getByRole('link', {
				name: 'Ver producto',
			})
			.first()
			.click();

		await expect(page).toHaveURL(/\/productos\/\d+/);

		const url = new URL(page.url());
		const urlPathname = url.pathname;
		const productId = urlPathname.split('/').at(-1);

		if (!productId) {
			throw new Error('Product ID not found in URL');
		}

		await expect(page.getByText(`ID: ${productId}`)).toBeVisible();
	});
});

test.describe('Create product', () => {
	const mockProduct = ProductRepositoryMother.create();

	test('Should create a product and navigate to its details', async ({
		page,
	}) => {
		await page.getByRole('link', { name: '+ Añadir Producto' }).click();

		await expect(page).toHaveURL('/productos/nuevo');
		await page
			.getByRole('textbox', { name: 'Título' })
			.fill(mockProduct.title);
		await page
			.getByRole('spinbutton', { name: 'Precio' })
			.fill(`${mockProduct.price}`);
		await page
			.getByRole('textbox', { name: 'Descripción' })
			.fill(mockProduct.description);
		await page.getByRole('combobox').click();
		await page
			.getByRole('option', { name: mockProduct.category, exact: true })
			.click();
		await page
			.getByRole('textbox', { name: 'Imagen' })
			.fill(mockProduct.image);
		await page.getByRole('button', { name: 'Agregar producto' }).click();

		// Confirm dialog
		await expect(
			page.getByText('Creación de nuevo producto'),
		).toBeVisible();
		await expect(
			page.getByText(`Título: ${mockProduct.title}`),
		).toBeVisible();
		await expect(
			page.getByText(`Precio: $${mockProduct.price}`),
		).toBeVisible();
		await expect(
			page.getByText(`Categoría: ${mockProduct.category.toUpperCase()}`),
		).toBeVisible();
		await expect(
			page.getByText(`Descripción: ${mockProduct.description}`),
		).toBeVisible();
		await page.getByRole('button', { name: 'Confirmar' }).click();
		await expect(
			page.getByText('Producto creado correctamente.'),
		).toBeVisible();
		await expect(page).toHaveURL(/\/productos\/\d+/);

		const url = new URL(page.url());
		const urlPathname = url.pathname;
		const productId = urlPathname.split('/').at(-1);

		if (!productId) {
			throw new Error('Product ID not found in URL');
		}

		await expect(page.getByText(`ID: ${productId}`)).toBeVisible();
	});
});

test.describe('Update product', () => {
	const mockProduct = ProductRepositoryMother.create();

	test('Should update a product and navigate to its details', async ({
		page,
	}) => {
		await expect(
			page.getByText(
				"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
			),
		).toBeVisible();

		await page
			.getByRole('link', {
				name: 'Editar producto',
			})
			.first()
			.click();

		await expect(page).toHaveURL(/\/productos\/\d+\/editar/);

		await page
			.getByRole('textbox', { name: 'Título' })
			.fill(mockProduct.title);
		await page
			.getByRole('spinbutton', { name: 'Precio' })
			.fill(`${mockProduct.price}`);
		await page
			.getByRole('textbox', { name: 'Descripción' })
			.fill(mockProduct.description);
		await page.getByRole('combobox').click();
		await page
			.getByRole('option', { name: mockProduct.category, exact: true })
			.click();
		await page
			.getByRole('textbox', { name: 'Imagen' })
			.fill(mockProduct.image);
		await page.getByRole('button', { name: 'Editar producto' }).click();

		// Confirm dialog
		await expect(page.getByText('Actualización de producto')).toBeVisible();
		await expect(
			page.getByText(`Título: ${mockProduct.title}`),
		).toBeVisible();
		await expect(
			page.getByText(`Precio: $${mockProduct.price}`),
		).toBeVisible();
		await expect(
			page.getByText(`Categoría: ${mockProduct.category.toUpperCase()}`),
		).toBeVisible();
		await expect(
			page.getByText(`Descripción: ${mockProduct.description}`),
		).toBeVisible();
		await page.getByRole('button', { name: 'Confirmar' }).click();
		await expect(
			page.getByText('Producto actualizado correctamente.'),
		).toBeVisible();
		await expect(page).toHaveURL(/\/productos\/\d+/);

		const url = new URL(page.url());
		const urlPathname = url.pathname;
		const productId = urlPathname.split('/').at(-1);

		if (!productId) {
			throw new Error('Product ID not found in URL');
		}

		await expect(page.getByText(`ID: ${productId}`)).toBeVisible();
	});
});
