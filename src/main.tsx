import '@styles/global.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import AppRouter from './AppRouter.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import AuthProvider from './context/auth.provider.tsx';
import GlobalProvider from './context/global.provider.tsx';
import { store } from './store/store.ts';
import { loadFonts } from './utils/loadFonts.ts';

loadFonts(['1em Satoshi', '700 1em IntegralCF']);

const ROOT = document.querySelector('#root');

if (ROOT) {
	createRoot(ROOT).render(
		<StrictMode>
			<Provider store={store}>
				<GlobalProvider>
					<AuthProvider>
						<ErrorBoundary>
							<AppRouter />
						</ErrorBoundary>
					</AuthProvider>
				</GlobalProvider>
			</Provider>
		</StrictMode>,
	);
}
