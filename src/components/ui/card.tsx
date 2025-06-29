/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...properties }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card"
			className={cn(
				'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
				className,
			)}
			{...properties}
		/>
	);
}

function CardHeader({ className, ...properties }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
				className,
			)}
			{...properties}
		/>
	);
}

function CardTitle({ className, ...properties }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('leading-none font-semibold', className)}
			data-slot="card-title"
			{...properties}
		/>
	);
}

function CardDescription({
	className,
	...properties
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('text-sm text-muted-foreground', className)}
			data-slot="card-description"
			{...properties}
		/>
	);
}

function CardAction({ className, ...properties }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
				className,
			)}
			{...properties}
		/>
	);
}

function CardContent({
	className,
	...properties
}: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('px-6', className)}
			data-slot="card-content"
			{...properties}
		/>
	);
}

function CardFooter({ className, ...properties }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
			data-slot="card-footer"
			{...properties}
		/>
	);
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
