import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const ROOT = document.querySelector('#root');

if (ROOT) {
	createRoot(ROOT).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
