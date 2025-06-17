import type { JSX, TextareaHTMLAttributes } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface Properties<T extends FieldValues>
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	error?: FieldError;
	classNameLabel?: string;
	classNameSpan?: string;
	classNameTextarea?: string;
	classNameError?: string;
	isScreenReaderOnly?: boolean;
	Icon?: string;
}

export const TextAreaForm = <T extends FieldValues>({
	control,
	error,
	label,
	name,
	classNameLabel,
	classNameSpan,
	classNameTextarea: classNameInput,
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
				<textarea
					className={`${classNameInput} ${invalid && 'is-invalid'}`}
					id={name}
					{...field}
					{...rest}
				/>
			)}
		/>
		{error && <p className={classNameError}>{error.message}</p>}
	</label>
);
