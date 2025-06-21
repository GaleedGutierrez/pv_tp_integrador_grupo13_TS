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
import type { JSX } from 'react';

interface Properties {
	isDialogOpen: boolean;
	onDialogOpenChange: (open: boolean) => void;
	onDialogCancel: () => void;
	onConfirm: () => void;
}

export const CancelDialog = ({
	isDialogOpen,
	onDialogCancel: handleDialogCancel,
	onDialogOpenChange: handleDialogOpenChange,
	onConfirm: handleConfirm,
}: Properties): JSX.Element => (
	<AlertDialog
		open={isDialogOpen}
		onOpenChange={handleDialogOpenChange}
	>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>
					¿Estás seguro que querés cancelar la creación del producto?
				</AlertDialogTitle>
				<AlertDialogDescription>
					Si cancelás, se perderán todos los datos ingresados hasta el
					momento.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel onClick={handleDialogCancel}>
					Cancelar
				</AlertDialogCancel>
				<AlertDialogAction onClick={handleConfirm}>
					Continuar
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);
