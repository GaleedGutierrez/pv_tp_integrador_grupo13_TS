import type { InputHTMLAttributes, JSX } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface Properties<T extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	type: string;
	error?: FieldError;
	classNameLabel?: string;
	classNameSpan?: string;
	classNameInput?: string;
	classNameError?: string;
	isScreenReaderOnly?: boolean;
	Icon?: string;
}

export const InputForm = <T extends FieldValues>({
	control,
	error,
	label,
	name,
	type,
	classNameLabel,
	classNameSpan,
	classNameInput,
	classNameError,
	isScreenReaderOnly = false,
	Icon,
	...rest
}: Properties<T>): JSX.Element => (
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
				<input
					className={`${classNameInput} ${invalid && 'is-invalid'}`}
					id={name}
					type={type}
					{...field}
					{...rest}
				/>
			)}
		/>
		{error && <p className={classNameError}>{error.message}</p>}
	</label>
);
