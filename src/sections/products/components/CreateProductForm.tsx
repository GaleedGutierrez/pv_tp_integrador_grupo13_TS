import type { JSX } from 'react';

import { ProductForm } from './ProductForm';

export const CreateProductForm = (): JSX.Element => (
	<ProductForm modeForm="create" />
);
