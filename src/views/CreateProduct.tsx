import { CreateProductForm } from '@sections/products/components/CreateProductForm';
import type { JSX } from 'react';

/**
 * This component renders a form for creating a new product.
 * @returns The rendered CreateProduct component.
 * */
export const CreateProduct = (): JSX.Element => (
	<section className="mb-8">
		<CreateProductForm />
	</section>
);
