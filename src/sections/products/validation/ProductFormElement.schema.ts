import * as z from 'zod';

import {
	ProductCategory,
	type TypeProductCategory,
} from '@/modules/products/domain/ProductCategory';

export const RatingSchema = z.object({
	rate: z
		.string()
		.min(1, { message: 'La calificación es requerida' })
		.refine(
			(value) => {
				const NUMBER_VALUE = Number(value);

				return (
					!Number.isNaN(NUMBER_VALUE) &&
					NUMBER_VALUE >= 0 &&
					NUMBER_VALUE <= 5
				);
			},
			{
				message: 'La calificación debe ser un número entre 0 y 5',
			},
		)
		.refine(
			(value) => {
				const NUMBER_VALUE = Number(value);

				return Number.isInteger(NUMBER_VALUE * 10); // Permite decimales hasta 1 lugar
			},
			{
				message: 'La calificación puede tener máximo 1 decimal',
			},
		),

	count: z
		.string()
		.min(1, { message: 'El conteo es requerido' })
		.refine(
			(value) => {
				const NUMBER_VALUE = Number(value);

				return (
					!Number.isNaN(NUMBER_VALUE) &&
					NUMBER_VALUE >= 0 &&
					Number.isInteger(NUMBER_VALUE)
				);
			},
			{
				message:
					'El conteo debe ser un número entero mayor o igual a 0',
			},
		),
});
export type Rating = z.infer<typeof RatingSchema>;

export const ProductFormSchema = z.object({
	title: z.string().min(1, {
		message: 'El título no puede estar vacío',
	}),

	price: z
		.string()
		.min(1, { message: 'El precio es requerido' })
		.refine(
			(value) => {
				const numberValue = Number(value);

				return !Number.isNaN(numberValue) && numberValue > 0;
			},
			{
				message: 'El precio debe ser un número mayor a 0',
			},
		),

	description: z.string().min(1, {
		message: 'La descripción no puede estar vacía',
	}),

	category: z
		.string()
		.min(1, {
			message: 'Por favor, selecciona una categoría',
		})
		.refine(
			(category) => {
				const VALID_CATEGORIES = Object.values(ProductCategory);

				return VALID_CATEGORIES.includes(
					category as TypeProductCategory,
				);
			},
			{
				message: 'La categoría debe ser válida',
			},
		),

	image: z
		.string()
		.min(1, {
			message: 'La URL de la imagen no puede estar vacía',
		})
		.url({
			message: 'La URL de la imagen debe ser válida',
		})
		.trim(),

	rating: RatingSchema,
});
export type ProductFormData = z.infer<typeof ProductFormSchema>;
