import { InputForm } from '@components/InputForm';
import { TextAreaForm } from '@components/TextAreaForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { PlusIcon } from '@ui/plus';
import { XIcon } from '@ui/x';
import { type JSX, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
	type ProductFormData,
	ProductFormSchema,
} from '../../validation/ProductFormElement.schema';
import { CancelDialog } from './components/CancelDialog';
import { ConfirmDialog } from './components/ConfirmDialog';
import { SelectForm } from './components/SelectForm';

export const CreateProductForm = (): JSX.Element => {
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
	const [pendingData, setPendingData] = useState<ProductFormData>();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProductFormData>({
		resolver: zodResolver(ProductFormSchema),
		mode: 'onBlur',
		defaultValues: {
			title: '',
			description: '',
			price: '',
			category: '',
			image: '',
			rating: {
				rate: '',
				count: '',
			},
		},
	});

	const navigate = useNavigate();

	// Function to handle form submission
	const handleFormSubmit = (data: ProductFormData): void => {
		setPendingData(data);
		setIsConfirmDialogOpen(true);
	};

	const handleConfirm = (): void => {
		if (!pendingData) {
			return;
		}

		setIsConfirmDialogOpen(false);
		setPendingData(undefined);
		reset();
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
		reset();
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
		<section className="mt-8 flex w-full flex-col items-center justify-center gap-5 px-4">
			<h1>Crea un nuevo producto</h1>
			<form
				className="flex w-full max-w-2xl flex-col gap-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm"
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<h2 className="font-primary text-2xl font-bold">
					Ingresa los datos
				</h2>
				<div className="flex flex-col gap-4">
					<InputForm
						required
						classNameError="text-red-500 text-sm"
						classNameInput="font-normal h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
						classNameLabel="flex flex-col gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
						control={control}
						error={errors.title}
						label="Título"
						name="title"
						placeholder="Remera para hombre"
						type="text"
					/>
					<InputForm
						required
						classNameError="text-red-500 text-sm"
						classNameInput="font-normal h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
						classNameLabel="flex flex-col gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
						control={control}
						error={errors.price}
						label="Precio"
						name="price"
						placeholder="$99.99"
						type="number"
					/>
					<TextAreaForm
						required
						classNameError="text-red-500 text-sm"
						classNameLabel="flex flex-col gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
						classNameTextarea="font-normal field-sizing-content w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
						control={control}
						error={errors.description}
						label="Descripción"
						name="description"
						placeholder="Remera de algodón 100% con estampado moderno. Disponible en varias tallas y colores."
					/>
					{/* <DatalistForm
						required
						classNameError="text-red-500 text-sm"
						classNameInput="font-normal h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
						classNameLabel="flex flex-col gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
						control={control}
						error={errors.category}
						label="Categoría"
						name="category"
						placeholder="men's clothing"
						options={Object.values(ProductCategory).map(
							(category) => ({
								label: category,
								value: category,
							}),
						)}
					/> */}
					<SelectForm
						classNameError="text-red-500 text-sm"
						classNameLabel="flex flex-col gap-2"
						classNameSpan="font-medium"
						control={control}
						error={errors.category}
						label="Categoría"
						name="category"
					/>
					<InputForm
						required
						classNameError="text-red-500 text-sm"
						classNameInput="font-normal h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
						classNameLabel="flex flex-col gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
						control={control}
						error={errors.image}
						label="Imagen"
						name="image"
						placeholder="https://example.com/image.jpg"
						type="url"
					/>
					<fieldset className="flex flex-col gap-4">
						<legend className="sr-only mb-1 block text-xl font-medium">
							Calificación del producto
						</legend>
						<InputForm
							required
							classNameError="text-red-500 text-sm"
							classNameInput="font-normal h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
							classNameLabel="flex flex-col gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
							control={control}
							error={errors.rating?.rate}
							label="Calificación entre 0 y 5"
							name="rating.rate"
							placeholder="5"
							type="number"
						/>
						<InputForm
							required
							classNameError="text-red-500 text-sm"
							classNameInput="font-normal h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
							classNameLabel="flex flex-col gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
							control={control}
							error={errors.rating?.count}
							label="Conteo de calificaciones"
							name="rating.count"
							placeholder="100"
							type="number"
						/>
					</fieldset>
				</div>
				<div className="flex w-full flex-col items-center justify-end gap-3 md:flex-row">
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
						className="w-full text-base md:w-fit"
						type="submit"
					>
						<PlusIcon />
						Agregar producto
					</Button>
				</div>
			</form>
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
