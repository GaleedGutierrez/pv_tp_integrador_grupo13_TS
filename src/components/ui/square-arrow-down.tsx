/* eslint-disable unicorn/filename-case */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface SquareArrowDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareArrowDownIconProperties extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const squareVariants: Variants = {
	normal: { transition: { duration: 0.4 } },
	animate: { transition: { duration: 0.6, ease: 'easeInOut' } },
};

const pathVariants: Variants = {
	normal: { d: 'm8 12 4 4 4-4', transform: 'translateY(0px)', opacity: 1 },
	animate: {
		d: 'm8 12 4 4 4-4',
		transform: ['translateY(0px)', 'translateY(-3px)', 'translateY(0px)'],
		transition: { duration: 0.4 },
	},
};

const secondPathVariants: Variants = {
	normal: { d: 'M12 8v8', opacity: 1 },
	animate: {
		d: ['M12 8v8', 'M12 8v5', 'M12 8v8'],
		transition: { duration: 0.4 },
	},
};

const SquareArrowDownIcon = forwardRef<
	SquareArrowDownIconHandle,
	SquareArrowDownIconProperties
>(
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
				<svg
					fill="none"
					height={size}
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					viewBox="0 0 24 24"
					width={size}
					xmlns="http://www.w3.org/2000/svg"
				>
					<motion.rect
						animate={controls}
						height="18"
						initial="normal"
						rx="2"
						variants={squareVariants}
						width="18"
						x="3"
						y="3"
					/>
					<motion.path
						animate={controls}
						d="m8 12 4 4 4-4"
						initial="normal"
						variants={pathVariants}
					/>
					<motion.path
						animate={controls}
						d="M12 8v8"
						initial="normal"
						variants={secondPathVariants}
					/>
				</svg>
			</div>
		);
	},
);

SquareArrowDownIcon.displayName = 'SquareArrowDownIcon';

export { SquareArrowDownIcon };
