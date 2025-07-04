import type { Page } from '@playwright/test';

import type { User } from '@/modules/users/domain/User';

export async function fillLogin(page: Page, user: User): Promise<void> {
	await page
		.getByRole('textbox', { name: 'Correo Electrónico' })
		.fill(user.email);
	await page.getByRole('textbox', { name: 'Contraseña' }).fill(user.password);
	await page.getByRole('button', { name: 'Iniciar sesión' }).click();
}
