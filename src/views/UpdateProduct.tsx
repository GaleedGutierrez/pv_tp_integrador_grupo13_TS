import { UpdateProductForm } from '@sections/products/components/UpdateProductForm';
import type { JSX } from 'react';

/**
 * This component renders a form for updating a product.
 * @returns The rendered UpdateProduct component.
 * */
export const UpdateProduct = (): JSX.Element => (
	<section className="my-8">
		<UpdateProductForm />
	</section>
);
