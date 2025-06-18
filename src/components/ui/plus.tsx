/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';

import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface PlusIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PlusIconProperties extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const PlusIcon = forwardRef<PlusIconHandle, PlusIconProperties>(
	(
		{ onMouseEnter, onMouseLeave, className, size = 28, ...properties },
		reference,
	) => {
		const controls = useAnimation();
		const isControlledReference = useRef(false);

		useImperativeHandle(reference, () => {
			isControlledReference.current = true;

			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (isControlledReference.current) {
					onMouseEnter?.(e);
				} else {
					controls.start('animate');
				}
			},
			[controls, onMouseEnter],
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (isControlledReference.current) {
					onMouseLeave?.(e);
				} else {
					controls.start('normal');
				}
			},
			[controls, onMouseLeave],
		);

		return (
			<div
				className={cn(className)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...properties}
			>
				<motion.svg
					animate={controls}
					fill="none"
					height={size}
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					transition={{ type: 'spring', stiffness: 100, damping: 15 }}
					viewBox="0 0 24 24"
					width={size}
					xmlns="http://www.w3.org/2000/svg"
					variants={{
						normal: {
							rotate: 0,
						},
						animate: {
							rotate: 180,
						},
					}}
				>
					<path d="M5 12h14" />
					<path d="M12 5v14" />
				</motion.svg>
			</div>
		);
	},
);

PlusIcon.displayName = 'PlusIcon';

export { PlusIcon };
