/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useTheme } from 'next-themes';
import type { ToasterProps } from 'sonner';
import { Toaster as Sonner } from 'sonner';

const Toaster = ({ ...properties }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			className="toaster group"
			theme={theme as ToasterProps['theme']}
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
				} as React.CSSProperties
			}
			{...properties}
		/>
	);
};

export { Toaster };
