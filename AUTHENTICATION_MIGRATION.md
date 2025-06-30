# Migración de Autenticación a Contexto Global

## Cambios Realizados

### ✅ Migración Completada

La lógica de autenticación ha sido migrada del custom hook `useAuth` al
**contexto global** para mejorar la arquitectura y el rendimiento.

### Archivos Actualizados

1. **`src/context/global.context.ts`**

   - Añadido `AuthState` y `AuthActions` al contexto
   - Incluye `LoginResult` interface

2. **`src/context/global.provider.tsx`**

   - Migrada toda la lógica de autenticación del hook `useAuth`
   - Manejo de estado de autenticación centralizado
   - Escucha cambios en localStorage para sincronización entre tabs

3. **Componentes actualizados para usar el contexto:**

   - `src/AppRouter.tsx`
   - `src/sections/users/components/LoginForm.tsx`
   - `src/guard/PrivateGuard.tsx`
   - `src/guard/PublicGuard.tsx`
   - `src/components/Navbar.tsx`
   - `src/RootRedirect.tsx`

4. **`src/hooks/useAuthContext.ts`** (Nuevo)
   - Hook de conveniencia para acceder a la autenticación
   - Misma interfaz que el `useAuth` anterior

## Cómo Usar el Nuevo Sistema

### Opción 1: Usar el contexto directamente

```tsx
import { useGlobalContext } from "@/context/global.context";

function MyComponent() {
  const { auth, authActions } = useGlobalContext();
  const { isLoggedIn, user, isLoading } = auth;
  const { login, logout, checkSession } = authActions;

  // ...resto del componente
}
```

### Opción 2: Usar el hook de conveniencia

```tsx
import { useAuthContext } from "@/hooks/useAuthContext";

function MyComponent() {
  const { isLoggedIn, user, isLoading, login, logout, checkSession } =
    useAuthContext();

  // ...resto del componente
}
```

## Ventajas de la Nueva Arquitectura

1. **Performance**: Un solo estado compartido vs múltiples instancias del hook
2. **Sincronización**: Estado automáticamente sincronizado entre componentes
3. **Mantenibilidad**: Lógica centralizada en el provider
4. **Flexibilidad**: Fácil acceso desde cualquier componente

## Estado del Hook Anterior

El archivo `src/hooks/useAuth.ts` **puede ser eliminado** ya que toda su
funcionalidad está ahora en el contexto global.

## Funcionalidades Incluidas

- ✅ Login/Logout
- ✅ Verificación de sesión automática
- ✅ Sincronización entre tabs (localStorage events)
- ✅ Manejo de errores
- ✅ Loading states
- ✅ Refresh de sesión
- ✅ Protección de rutas automática
