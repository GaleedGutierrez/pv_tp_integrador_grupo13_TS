import { ProductCategory } from '@modules/products/domain/ProductCategory';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@ui/select';
import type { JSX } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface Properties<T extends FieldValues> {
	control: Control<T>;
	error?: FieldError;
	name: Path<T>;
	classNameError?: string;
	label: string;
	classNameLabel?: string;
	classNameSpan?: string;
}

export const SelectForm = <T extends FieldValues>({
	control,
	error,
	name,
	classNameError,
	label,
	classNameLabel,
	classNameSpan,
}: Properties<T>): JSX.Element => {
	const Categories = Object.values(ProductCategory).map((category) => ({
		label: category,
		value: category,
	}));

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid } }) => (
				<div className={classNameLabel}>
					<span className={classNameSpan}>{label}</span>
					<Select
						value={field.value}
						// eslint-disable-next-line react/jsx-handler-names
						onValueChange={field.onChange}
					>
						<SelectTrigger
							className={`w-full text-base ${invalid ? 'is-invalid' : ''}`}
						>
							<SelectValue placeholder="Selecciona la categoría" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Categoría</SelectLabel>
								{Categories.map((category) => (
									<SelectItem
										key={category.value}
										className="text-base"
										value={category.value}
									>
										{category.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					{error && <p className={classNameError}>{error.message}</p>}
				</div>
			)}
		/>
	);
};
