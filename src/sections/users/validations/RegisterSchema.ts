import * as z from 'zod';

export const RegisterSchema = z
	.object({
		email: z.string().email({
			message: 'Verifica el correo electrónico ingresado.',
		}),
		username: z
			.string()
			.min(2, {
				message:
					'El nombre de usuario debe tener al menos 2 caracteres',
			})
			.optional(),
		password: z.string().min(6, {
			message: 'La contraseña debe tener al menos 6 caracteres',
		}),
		confirmPassword: z.string(),
	})
	.refine(
		(data) => {
			if (!data.password || !data.confirmPassword) {
				return true;
			}

			return data.password === data.confirmPassword;
		},
		{
			message: 'Las contraseñas no coinciden',
			path: ['confirmPassword'],
		},
	);
export type RegisterSchemaData = z.infer<typeof RegisterSchema>;
