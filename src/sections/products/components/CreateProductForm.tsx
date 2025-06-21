import { DatalistForm } from '@components/DatalistForm';
import { InputForm } from '@components/InputForm';
import { TextAreaForm } from '@components/TextAreaForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductCategory } from '@modules/products/domain/ProductCategory';
import {
	AlertDialogAction,
	AlertDialogCancel,
} from '@radix-ui/react-alert-dialog';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';
import { PlusIcon } from '@ui/plus';
import { XIcon } from '@ui/x';
import { type JSX, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
	type ProductFormData,
	ProductFormSchema,
} from '../validation/ProductFormElement.schema';

interface ConfirmDialogProperties {
	isDialogOpen: boolean;
	onDialogOpenChange: () => void;
	onDialogCancel: () => void;
	onConfirm: () => void;
	pendingData?: ProductFormData;
}

/**  */
const ConfirmDialog = ({
	isDialogOpen,
	onDialogOpenChange: handleDialogOpenChange,
	onDialogCancel: handleDialogCancel,
	onConfirm: handleConfirm,
	pendingData,
}: ConfirmDialogProperties): JSX.Element => (
	<AlertDialog
		open={isDialogOpen}
		onOpenChange={handleDialogOpenChange}
	>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Creación de nuevo producto</AlertDialogTitle>
				<AlertDialogDescription>
					Revisa los datos antes de confirmar
				</AlertDialogDescription>
			</AlertDialogHeader>
			{pendingData && (
				<div className="mt-4 space-y-2 text-left">
					<div className="rounded-sm rounded-xl bg-gray-100 p-7">
						<img
							alt={pendingData.title}
							className="max-m-36 max-h-36 justify-self-center mix-blend-multiply"
							src={pendingData.image}
						/>
					</div>
					<p>
						<strong>Título:</strong> {pendingData.title}
					</p>
					<p>
						<strong>Precio:</strong> ${pendingData.price}
					</p>
					<p className="capitalize">
						<strong>Categoría:</strong> {pendingData.category}
					</p>
					<p>
						<strong>Descripción:</strong> {pendingData.description}
					</p>
					<p>
						<strong>Calificación:</strong> {pendingData.rating.rate}
						/5 ({pendingData.rating.count} reseñas)
					</p>
				</div>
			)}
			<AlertDialogFooter>
				<AlertDialogCancel asChild>
					<Button
						variant="secondary"
						onClick={handleDialogCancel}
					>
						Cancelar
					</Button>
				</AlertDialogCancel>
				<AlertDialogAction asChild>
					<Button onClick={handleConfirm}>Confirmar</Button>
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

export const CreateProductForm = (): JSX.Element => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
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

	const handleFormSubmit = (data: ProductFormData): void => {
		setPendingData(data);
		setIsDialogOpen(true);
	};

	const handleConfirm = (): void => {
		if (!pendingData) {
			return;
		}

		setIsDialogOpen(false);
		setPendingData(undefined);
		reset();
	};

	const handleDialogCancel = (): void => {
		setIsDialogOpen(false);
		setPendingData(undefined);
	};

	const handleDialogOpenChange = (open: boolean): void => {
		if (!open) {
			handleDialogCancel();
		}
	};

	const handleCancel = async (): Promise<void> => {
		reset();
		await navigate('/');
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
						classNameInput="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
						classNameLabel="flex flex-col gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
						control={control}
						error={errors.title}
						label="Nombre"
						name="title"
						placeholder="Remera para hombre"
						type="text"
					/>
					<InputForm
						required
						classNameError="text-red-500 text-sm"
						classNameInput="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
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
						classNameTextarea="field-sizing-content w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
						control={control}
						error={errors.description}
						label="Descripción"
						name="description"
						placeholder="Remera de algodón 100% con estampado moderno. Disponible en varias tallas y colores."
					/>
					<DatalistForm
						required
						classNameError="text-red-500 text-sm"
						classNameInput="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
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
					/>
					<InputForm
						required
						classNameError="text-red-500 text-sm"
						classNameInput="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
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
							classNameInput="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
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
							classNameInput="h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40"
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
				isDialogOpen={isDialogOpen}
				pendingData={pendingData}
				onConfirm={handleConfirm}
				onDialogCancel={handleDialogCancel}
				onDialogOpenChange={() => handleDialogOpenChange(isDialogOpen)}
			/>
		</section>
	);
};
