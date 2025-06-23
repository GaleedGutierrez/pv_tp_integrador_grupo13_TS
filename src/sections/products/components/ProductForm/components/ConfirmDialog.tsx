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

import type { ProductFormData } from '@/sections/products/validation/ProductFormElement.schema';

interface Properties {
	isDialogOpen: boolean;
	onDialogOpenChange: (open: boolean) => void;
	onDialogCancel: () => void;
	onConfirm: () => void;
	pendingData?: ProductFormData;
}

/** Dialog to confirm product creation with pending data. */
export const ConfirmDialog = ({
	isDialogOpen,
	onDialogOpenChange: handleDialogOpenChange,
	onDialogCancel: handleDialogCancel,
	onConfirm: handleConfirm,
	pendingData,
}: Properties): JSX.Element => (
	<AlertDialog
		open={isDialogOpen}
		onOpenChange={handleDialogOpenChange}
	>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Creación de nuevo producto</AlertDialogTitle>
				<AlertDialogDescription className="text-base">
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
