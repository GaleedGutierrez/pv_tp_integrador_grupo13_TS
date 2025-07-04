# Solución al Loop Infinito de Redirecciones

## Problema Identificado

El loop infinito se generaba por la siguiente secuencia:

1. **Usuario logueado accede a `/`**
2. **AppRouter manejaba `/` con `PublicGuard`**
3. **PublicGuard permite acceso a `/` (correcto)**
4. **PublicRoutes renderiza, pero tiene ruta `*` que redirige a
   `/iniciar-sesion`**
5. **PublicGuard detecta `/iniciar-sesion` como ruta restringida para usuarios
   logueados**
6. **PublicGuard redirige de vuelta a `/`**
7. **Se repite el ciclo infinitamente**

## Solución Implementada

### 1. Reestructuración del AppRouter

```typescript
// ANTES (problemático)
<Routes>
  <Route element={<PublicGuard />}>
    <Route element={<PublicRoutes />} path="/*" />
  </Route>
  <Route element={<PrivateGuard />}>
    <Route element={<PrivateRoutes />} path="/home/*" />
  </Route>
</Routes>

// DESPUÉS (solucionado)
<Routes>
  {/* Ruta raíz - redirección inteligente */}
  <Route
    path="/"
    element={
      <Navigate
        replace
        to={isLoggedIn ? appRoutes.private.home : appRoutes.public.login}
      />
    }
  />

  {/* Rutas públicas específicas */}
  <Route element={<PublicGuard />}>
    <Route element={<PublicRoutes />} path="/iniciar-sesion/*" />
    <Route element={<PublicRoutes />} path="/registrar/*" />
  </Route>

  {/* Rutas privadas */}
  <Route element={<PrivateGuard />}>
    <Route element={<PrivateRoutes />} path="/home/*" />
  </Route>

  {/* Fallback */}
  <Route
    path="*"
    element={
      <Navigate
        replace
        to={isLoggedIn ? appRoutes.private.home : appRoutes.public.login}
      />
    }
  />
</Routes>
```

### 2. Eliminación de Redirecciones Problemáticas

**PublicRoutes simplificado:**

```typescript
// ANTES (problemático)
<Routes>
  <Route element={<Layout />}>
    <Route element={<Login />} path="/iniciar-sesion" />
    <Route element={<Register />} path="/registrar" />
    <Route element={<Navigate to="/iniciar-sesion" />} path="*" />
  </Route>
</Routes>

// DESPUÉS (solucionado)
<Routes>
  <Route element={<Layout />}>
    <Route element={<Login />} path="/iniciar-sesion" />
    <Route element={<Register />} path="/registrar" />
  </Route>
</Routes>
```

### 3. Simplificación del PublicGuard

**Eliminación de lógica compleja de redirección:**

```typescript
// ANTES (problemático)
const locationState = location.state as LocationState | null;
const redirectTo = locationState?.from ?? appRoutes.private.home;

// DESPUÉS (solucionado)
const redirectTo = appRoutes.private.home;
```

## Flujo de Navegación Mejorado

### Para Usuarios No Logueados

1. Acceso a `/` → Redirige a `/iniciar-sesion`
2. Acceso a `/iniciar-sesion` → Permitido
3. Acceso a `/registrar` → Permitido
4. Acceso a `/home` → Redirige a `/iniciar-sesion` (PrivateGuard)
5. Acceso a rutas no encontradas → Redirige a `/iniciar-sesion`

### Para Usuarios Logueados

1. Acceso a `/` → Redirige a `/home`
2. Acceso a `/iniciar-sesion` → Redirige a `/home` (PublicGuard)
3. Acceso a `/registrar` → Redirige a `/home` (PublicGuard)
4. Acceso a `/home` → Permitido
5. Acceso a rutas no encontradas → Redirige a `/home`

## Ventajas de la Solución

1. **Eliminación de Loops**: No hay redirecciones circulares
2. **Redirección Inteligente**: La ruta `/` redirige según el estado de
   autenticación
3. **Rutas Específicas**: Los guards solo manejan las rutas que les corresponden
4. **Mejor UX**: Los usuarios van directamente a donde necesitan estar
5. **Debugging Fácil**: Logs claros y sin spam

## Casos de Prueba

### ✅ Casos que Funcionan Correctamente

1. **Usuario no logueado va a `/`**: → `/iniciar-sesion`
2. **Usuario logueado va a `/`**: → `/home`
3. **Usuario logueado va a `/iniciar-sesion`**: → `/home`
4. **Usuario no logueado va a `/home`**: → `/iniciar-sesion`
5. **Usuario logueado va a ruta inexistente**: → `/home`
6. **Usuario no logueado va a ruta inexistente**: → `/iniciar-sesion`

### ❌ Casos que Ya No Ocurren

1. **Loop infinito `/` ↔ `/iniciar-sesion`**
2. **Redirecciones múltiples innecesarias**
3. **Estado de carga infinito**
4. **Errores de navegación en el browser**

## Logs de Debug Esperados

```text
[AppRouter] Usuario logueado accede a '/' - redirigiendo a '/home'
[PrivateGuard] Estado verificado {isLoggedIn: true, pathname: '/home'}
[PrivateGuard] Acceso permitido {pathname: '/home'}
```

```text
[AppRouter] Usuario no logueado accede a '/' - redirigiendo a '/iniciar-sesion'
[PublicGuard] Estado verificado {isLoggedIn: false, pathname: '/iniciar-sesion'}
[PublicGuard] Acceso permitido {pathname: '/iniciar-sesion'}
```

## Consideraciones Técnicas

1. **Performance**: Menos re-renders innecesarios
2. **Memory**: Sin acumulación de estados de navegación
3. **SEO**: URLs más predecibles
4. **Accessibility**: Navegación más clara para screen readers
5. **Testing**: Casos de prueba más simples y directos
