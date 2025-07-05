import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';
import type { JSX } from 'react';

import type { ProductFormData } from '@/sections/products/validations/ProductFormElement.schema';

interface Properties {
	isDialogOpen: boolean;
	onDialogOpenChange: (open: boolean) => void;
	onDialogCancel: () => void;
	onConfirm: () => void;
	pendingData?: ProductFormData;
	mode: 'create' | 'update';
}

/** Dialog to confirm product creation with pending data. */
export const ConfirmDialog = ({
	isDialogOpen,
	onDialogOpenChange: handleDialogOpenChange,
	onDialogCancel: handleDialogCancel,
	onConfirm: handleConfirm,
	pendingData,
	mode = 'create',
}: Properties): JSX.Element => {
	const DIALOG_TITLE =
		mode === 'create'
			? 'Creación de nuevo producto'
			: 'Actualización de producto';

	return (
		<AlertDialog
			open={isDialogOpen}
			onOpenChange={handleDialogOpenChange}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{DIALOG_TITLE}</AlertDialogTitle>
					<AlertDialogDescription className="text-base">
						Revisa los datos antes de confirmar
					</AlertDialogDescription>
				</AlertDialogHeader>
				{pendingData && (
					<div className="mt-4 space-y-2 text-left">
						<div className="rounded-sm rounded-xl bg-gray-100 p-7">
							<img
								alt={pendingData.title}
								className="max-m-36 flex max-h-36 items-center justify-center justify-self-center mix-blend-multiply"
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
							<strong>Descripción:</strong>{' '}
							{pendingData.description}
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
					<AlertDialogAction onClick={handleConfirm}>
						Confirmar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
