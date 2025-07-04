import type { User } from '@modules/users/domain/User';
import type { Page } from '@playwright/test';

type RegisterUser = User & {
	confirmPassword?: string;
};

export async function registerUser(
	page: Page,
	user: RegisterUser,
): Promise<void> {
	user.confirmPassword = user.confirmPassword ?? user.password;
	await page.getByLabel('Nombre (opcional)').fill(user.name ?? '');
	await page.getByLabel('Apellido (opcional)').fill(user.lastname ?? '');
	await page.getByLabel('Correo Electrónico').fill(user.email);
	await page
		.getByLabel('Contraseña', {
			exact: true,
		})
		.fill(user.password);
	await page.getByLabel('Confirmar Contraseña').fill(user.confirmPassword);
	await page.getByRole('button', { name: 'Crear cuenta' }).click();
}
