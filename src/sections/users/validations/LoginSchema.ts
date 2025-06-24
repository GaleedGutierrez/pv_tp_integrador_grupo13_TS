import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Verifica el correo electrónico ingresado.',
	}),
	password: z.string(),
});
export type LoginSchemaData = z.infer<typeof LoginSchema>;
