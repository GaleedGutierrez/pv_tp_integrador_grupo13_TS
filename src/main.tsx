import '@styles/global.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppRouter from './AppRouter.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { loadFonts } from './utils/loadFonts.ts';

loadFonts(['1em Satoshi', '700 1em IntegralCF']);

const ROOT = document.querySelector('#root');

if (ROOT) {
	createRoot(ROOT).render(
		<StrictMode>
			{/* <Provider store={store}> */}
			<ErrorBoundary>
				<AppRouter />
			</ErrorBoundary>
			{/* </Provider> */}
		</StrictMode>,
	);
}
