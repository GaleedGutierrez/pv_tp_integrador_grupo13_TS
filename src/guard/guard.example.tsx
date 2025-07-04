// /**
//  * Ejemplo de uso correcto de los guards
//  * Este archivo demuestra cómo implementar los guards sin loops infinitos
//  */

// import { type JSX } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router';

// import { PrivateGuard } from './PrivateGuard';
// import { PublicGuard } from './PublicGuard';

// // Ejemplo de implementación correcta del router
// export const RouterExample = (): JSX.Element => (
// 	<BrowserRouter>
// 		<Routes>
// 			{/*
//         Rutas públicas: Accesibles para todos, pero redirigen usuarios
//         logueados desde login/register hacia home
//       */}
// 			<Route element={<PublicGuard />}>
// 				<Route
// 					element={<div>Login Page</div>}
// 					path="/login"
// 				/>
// 				<Route
// 					element={<div>Register Page</div>}
// 					path="/register"
// 				/>
// 				<Route
// 					element={<div>Landing Page</div>}
// 					path="/"
// 				/>
// 			</Route>

// 			{/*
//         Rutas privadas: Solo accesibles para usuarios autenticados
//         Redirigen usuarios no logueados hacia login
//       */}
// 			<Route element={<PrivateGuard />}>
// 				<Route
// 					element={<div>Home Page</div>}
// 					path="/home"
// 				/>
// 				<Route
// 					element={<div>Profile Page</div>}
// 					path="/profile"
// 				/>
// 				<Route
// 					element={<div>Settings Page</div>}
// 					path="/settings"
// 				/>
// 			</Route>

// 			{/*
//         Ruta fallback: Cualquier ruta no definida se maneja como pública
//         y se redirige apropiadamente según el estado del usuario
//       */}
// 			<Route element={<PublicGuard />}>
// 				<Route
// 					element={<div>Not Found</div>}
// 					path="*"
// 				/>
// 			</Route>
// 		</Routes>
// 	</BrowserRouter>
// );

// /**
//  * Casos de uso y comportamiento esperado:
//  *
//  * 1. Usuario NO logueado:
//  *    - Accede a /login → Permitido
//  *    - Accede a /register → Permitido
//  *    - Accede a /home → Redirige a /login
//  *    - Accede a /profile → Redirige a /login
//  *
//  * 2. Usuario logueado:
//  *    - Accede a /login → Redirige a /home
//  *    - Accede a /register → Redirige a /home
//  *    - Accede a /home → Permitido
//  *    - Accede a /profile → Permitido
//  *
//  * 3. Durante loading:
//  *    - Cualquier ruta → Muestra LoadingSpinner
//  *
//  * 4. Rutas no encontradas:
//  *    - Usuario no logueado → Muestra página 404 pública
//  *    - Usuario logueado → Puede acceder a página 404 (se trata como pública)
//  */

// /**
//  * Flujo de autenticación recomendado:
//  *
//  * 1. App inicia → isLoading = true
//  * 2. Verificar localStorage/sessionStorage
//  * 3. Si hay token, validar con backend
//  * 4. Establecer estado final: isLoggedIn = true/false, isLoading = false
//  * 5. Guards evalúan y redirigen según corresponda
//  */

// /**
//  * Buenas prácticas implementadas:
//  *
//  * 1. Separación clara de responsabilidades
//  * 2. Manejo explícito del estado de loading
//  * 3. Preservación del estado de navegación
//  * 4. Logs de debug para troubleshooting
//  * 5. Validación de tipos TypeScript
//  * 6. Evitar redirecciones innecesarias
//  * 7. Manejo de casos edge
//  */
// eslint-disable-next-line unicorn/no-empty-file
