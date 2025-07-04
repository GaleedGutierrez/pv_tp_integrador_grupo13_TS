/// <reference types="vitest" />
/// <reference types="vite/client" />
import tailwindcss from '@tailwindcss/vite';
// Use when you need HTTPS in development
// import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	base: mode === 'production' ? '/pv_tp_integrador_grupo13_TS/' : '/',
	plugins: [
		react(),
		tsconfigPaths(),
		tailwindcss(),
		svgr({
			// svgr options: https://react-svgr.com/docs/options/
			svgrOptions: {
				exportType: 'default',
				ref: true,
				svgo: false,
				titleProp: true,
				plugins: ['@svgr/plugin-jsx'],
			},
			include: '**/*.svg?react',
			exclude: '**/*.svg',
		}),
		// basicSsl(),
	],
	server: {
		open: true,
		host: true,
	},
	test: {
		// browser: {
		// 	enabled: true,
		// 	name: 'chromium',
		// 	provider: 'playwright',
		// }, @vitest/browser" is not installed
		clearMocks: true, // Automatically clear mock calls, instances, contexts and results before every test
		// If you need coverage, you can enable it here
		// coverage: {
		// 	enabled: true, // Indicates whether the coverage information should be collected while executing the test
		// 	provider: 'v8', // Indicates which provider should be used to instrument code for coverage
		// 	reportsDirectory: 'coverage', // The directory where Vitest should output its coverage files
		// 	include: ['src/**/*'], // The glob patterns Vitest uses to detect test files
		// },
		globals: true,
		css: true,
		environment: 'jsdom', // The test environment that will be used for testing
		setupFiles: ['./tests/setup.ts'], // A list of paths to modules that run some code to configure or set up the testing framework before each test
		include: ['./tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
		alias: {
			'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
			'\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
				'jest-transform-stub',
		},
		// A map from regular expressions to paths to transformers
		transformMode: {
			web: ['**/*.tsx', '**/*.ts'], // Support for TypeScript files
		},
		reporters: process.env.GITHUB_ACTIONS
			? ['dot', 'github-actions']
			: ['dot'], // The list of reporters that will be used to report the test results
	},
}));
