import { useGlobalContext } from '@context/global.context';
import { zodResolver } from '@hookform/resolvers/zod';
import { productToPlainObject } from '@modules/products/application/ProductToPlainObject';
import type { Product } from '@modules/products/domain/Product';
import {
	ProductCategory,
	type TypeProductCategory,
} from '@modules/products/domain/ProductCategory';
import { Button } from '@ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@ui/form';
import { Input } from '@ui/input';
import { PlusIcon } from '@ui/plus';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@ui/select';
import { Textarea } from '@ui/textarea';
import { XIcon } from '@ui/x';
import { type JSX, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useProductActions } from '../../hooks/useProductActions';
import {
	type ProductFormData,
	ProductFormSchema,
} from '../../validation/ProductFormElement.schema';
import { CancelDialog } from './components/CancelDialog';
import { ConfirmDialog } from './components/ConfirmDialog';

interface Properties {
	modeForm: 'edit' | 'create';
	initialData?: ProductFormData;
}

const Categories = Object.values(ProductCategory).map((category) => ({
	label: category,
	value: category,
}));

export const ProductForm = ({
	modeForm,
	initialData,
}: Properties): JSX.Element => {
	const { addNewProduct } = useGlobalContext();
	const { addNewProduct: addNewProductStore } = useProductActions();
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
	const [pendingData, setPendingData] = useState<ProductFormData>();
	const form = useForm<ProductFormData>({
		resolver: zodResolver(ProductFormSchema),
		mode: 'onBlur',
		defaultValues: {
			title: initialData?.title ?? '',
			description: initialData?.description ?? '',
			price: initialData?.price ?? '',
			category: initialData?.category ?? '',
			image: initialData?.image ?? '',
		},
	});

	const navigate = useNavigate();
	// Títulos dinámicos según el modo
	const TITLE =
		modeForm === 'create' ? 'Crea un nuevo producto' : 'Editar producto';
	const SUBMIT_TEXT =
		modeForm === 'create' ? 'Agregar producto' : 'Editar producto';

	// Function to handle form submission
	const handleFormSubmit = (data: ProductFormData): void => {
		setPendingData(data);
		setIsConfirmDialogOpen(true);
	};

	const handleConfirm = (): void => {
		if (!pendingData) {
			return;
		}

		if (modeForm === 'create') {
			const PRODUCT: Omit<Product, 'id' | 'rating'> = {
				...pendingData,
				category: pendingData.category as TypeProductCategory,
			};

			addNewProduct
				?.create(PRODUCT)
				.then((resolve) => {
					if (!resolve) {
						throw new Error('No se pudo crear el producto');
					}

					const NEW_PRODUCT: Omit<Product, 'rating'> =
						productToPlainObject(resolve);

					addNewProductStore(NEW_PRODUCT);
				})
				.catch((error) => {
					console.error('Error al crear el producto:', error);
				});
		}

		// if (modeForm === 'edit') {
		// 	// Logic to edit an existing product
		// 	console.log('Editing product:', pendingData);
		// }

		setIsConfirmDialogOpen(false);
		setPendingData(undefined);
		form.reset();
	};

	const handleDialogCancel = (): void => {
		setIsConfirmDialogOpen(false);
		setPendingData(undefined);
	};

	const handleDialogConfirmOpenChange = (open: boolean): void => {
		if (!open) {
			handleDialogCancel();
		}
	};

	// Function to handle cancel button click
	const handleCancel = (): void => {
		setIsCancelDialogOpen(true);
	};

	const handleCancelConfirm = async (): Promise<void> => {
		setIsCancelDialogOpen(false);
		form.reset();
		await navigate('/');
	};

	const handleCancelDialogCancel = (): void => {
		setIsCancelDialogOpen(false);
	};

	const handleCancelDialogOpenChange = (open: boolean): void => {
		if (!open) {
			setIsCancelDialogOpen(false);
		}
	};

	return (
		<section className="flex w-full flex-col items-center justify-center gap-5 px-4">
			<Card className="w-full max-w-3xl">
				<CardHeader>
					<CardTitle>
						<h2 className="text-lg">{TITLE}</h2>
					</CardTitle>
					<CardDescription>
						<p>
							{modeForm === 'create'
								? 'Completa el formulario para agregar un nuevo producto.'
								: 'Edita los campos necesarios para actualizar el producto.'}
						</p>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							className="grid gap-5"
							id="product-form"
							onSubmit={form.handleSubmit(handleFormSubmit)}
						>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base">
											Título
										</FormLabel>
										<FormControl>
											<Input
												required
												className="text-base md:text-base"
												placeholder="Remera"
												type="text"
												{...field}
											/>
										</FormControl>
										<FormDescription className="text-base">
											Ingresa el título del producto
										</FormDescription>
										<FormMessage className="text-base" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base">
											Precio
										</FormLabel>
										<FormControl>
											<Input
												required
												className="text-base md:text-base"
												placeholder="99.99"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormDescription className="text-base">
											Ingresa el precio del producto
										</FormDescription>
										<FormMessage className="text-base" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base">
											Descripción
										</FormLabel>
										<FormControl>
											<Textarea
												required
												className="text-base md:text-base"
												placeholder="Remera de algodón 100% con estampado exclusivo."
												{...field}
											/>
										</FormControl>
										<FormDescription className="text-base">
											Agrega una descripción del producto
										</FormDescription>
										<FormMessage className="text-base" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base">
											Categoría
										</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												// eslint-disable-next-line react/jsx-handler-names
												onValueChange={field.onChange}
											>
												<SelectTrigger className="w-full text-base">
													<SelectValue placeholder="Selecciona la categoría" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>
															Categoría
														</SelectLabel>
														{Categories.map(
															(category) => (
																<SelectItem
																	key={
																		category.value
																	}
																	className="text-base"
																	value={
																		category.value
																	}
																>
																	{
																		category.label
																	}
																</SelectItem>
															),
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription className="text-base">
											Elije una categoría para el producto
										</FormDescription>
										<FormMessage className="text-base" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base">
											URL de la imagen
										</FormLabel>
										<FormControl>
											<Input
												required
												className="text-base md:text-base"
												placeholder="https://example.com/image.webp"
												type="url"
												{...field}
											/>
										</FormControl>
										<FormDescription className="text-base">
											Ingresa la URL de la imagen del
											producto
										</FormDescription>
										<FormMessage className="text-base" />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex w-full flex-col items-center justify-end gap-3 md:flex-row">
					<Button
						className="w-full text-base md:w-fit"
						type="button"
						variant="destructive"
						onClick={handleCancel}
					>
						<XIcon />
						Cancelar
					</Button>
					<Button
						className="text-base"
						form="product-form"
						type="submit"
					>
						<PlusIcon />
						{SUBMIT_TEXT}
					</Button>
				</CardFooter>
			</Card>
			<ConfirmDialog
				isDialogOpen={isConfirmDialogOpen}
				pendingData={pendingData}
				onConfirm={handleConfirm}
				onDialogCancel={handleDialogCancel}
				onDialogOpenChange={handleDialogConfirmOpenChange}
			/>
			<CancelDialog
				isDialogOpen={isCancelDialogOpen}
				onConfirm={handleCancelConfirm}
				onDialogCancel={handleCancelDialogCancel}
				onDialogOpenChange={handleCancelDialogOpenChange}
			/>
		</section>
	);
};
