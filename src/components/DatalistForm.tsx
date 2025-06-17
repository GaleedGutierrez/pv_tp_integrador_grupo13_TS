import type { InputHTMLAttributes, JSX } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface DatalistOption {
	value: string;
	label?: string;
}

interface Properties<T extends FieldValues>
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'list'> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	options: DatalistOption[] | string[];
	error?: FieldError;
	classNameLabel?: string;
	classNameSpan?: string;
	classNameInput?: string;
	classNameError?: string;
	isScreenReaderOnly?: boolean;
	Icon?: string;
}

export const DatalistForm = <T extends FieldValues>({
	control,
	error,
	label,
	name,
	options,
	classNameLabel,
	classNameSpan,
	classNameInput,
	classNameError,
	isScreenReaderOnly = false,
	Icon,
	...rest
}: Properties<T>): JSX.Element => {
	const datalistId = `datalist-${name}`;

	return (
		<label
			className={classNameLabel}
			htmlFor={name}
		>
			<span className={isScreenReaderOnly ? 'is-sr-only' : classNameSpan}>
				{label}
			</span>
			{Icon && <Icon />}
			<Controller
				control={control}
				name={name}
				render={({ field, fieldState: { invalid } }) => (
					<>
						<input
							className={`${classNameInput} ${invalid && 'is-invalid'}`}
							id={name}
							list={datalistId}
							{...field}
							{...rest}
						/>
						<datalist id={datalistId}>
							{options.map((option) => {
								const optionValue =
									typeof option === 'string'
										? option
										: option.value;
								const optionLabel =
									typeof option === 'string'
										? option
										: (option.label ?? option.value);

								return (
									<option
										key={optionValue}
										value={optionValue}
									>
										{optionLabel}
									</option>
								);
							})}
						</datalist>
					</>
				)}
			/>
			{error && <p className={classNameError}>{error.message}</p>}
		</label>
	);
};
