/* eslint-disable react-refresh/only-export-components */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
	useFormState,
} from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const Form = FormProvider;

interface FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...properties
}: ControllerProps<TFieldValues, TName>) => (
	<FormFieldContext.Provider value={{ name: properties.name }}>
		<Controller {...properties} />
	</FormFieldContext.Provider>
);

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>');
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

interface FormItemContextValue {
	id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

function FormItem({ className, ...properties }: React.ComponentProps<'div'>) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				className={cn('grid gap-2', className)}
				data-slot="form-item"
				{...properties}
			/>
		</FormItemContext.Provider>
	);
}

function FormLabel({
	className,
	...properties
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			className={cn('data-[error=true]:text-destructive', className)}
			data-error={Boolean(error)}
			data-slot="form-label"
			htmlFor={formItemId}
			{...properties}
		/>
	);
}

function FormControl({ ...properties }: React.ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			aria-invalid={Boolean(error)}
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				error
					? `${formDescriptionId} ${formMessageId}`
					: `${formDescriptionId}`
			}
			{...properties}
		/>
	);
}

function FormDescription({
	className,
	...properties
}: React.ComponentProps<'p'>) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			className={cn('text-sm text-muted-foreground', className)}
			data-slot="form-description"
			id={formDescriptionId}
			{...properties}
		/>
	);
}

function FormMessage({ className, ...properties }: React.ComponentProps<'p'>) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? '') : properties.children;

	if (!body) {
		return null;
	}

	return (
		<p
			className={cn('text-sm text-destructive', className)}
			data-slot="form-message"
			id={formMessageId}
			{...properties}
		>
			{body}
		</p>
	);
}

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
};
