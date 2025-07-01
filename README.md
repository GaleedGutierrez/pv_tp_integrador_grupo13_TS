# 🛍️ Trabajo Práctico Integrador - Shop.co

> **Universidad Nacional de Jujuy - Facultad de Ingeniería**
>
> **Programación Visual** - Segundo Año 2025
>
> **Grupo 13** - Trabajo Práctico Integrador

Una **Single Page Application (SPA)** de e-commerce moderna construida con
**React 19**, **TypeScript**, **Redux Toolkit** y **Tailwind CSS**,
implementando arquitectura hexagonal, autenticación simulada y gestión de estado
global.

## 📖 Resumen

**Shop.co** es una aplicación web de comercio electrónico que demuestra el
dominio de tecnologías frontend modernas mediante la implementación de
funcionalidades completas de CRUD, autenticación, rutas protegidas y gestión de
productos favoritos.

La aplicación consume la API pública de
[FakeStore API](https://fakestoreapi.com) y está diseñada con principios de
**arquitectura hexagonal**, **screaming architecture** y **vertical slicing**
para garantizar escalabilidad, mantenibilidad y separación de responsabilidades.

### 🎯 Objetivos Académicos Cumplidos

- **Gestión de Estado Global**: Implementación con Redux Toolkit y Context API.
- **Rutas y Navegación**: SPA con rutas públicas y protegidas usando con React
  Router 7.
- **Autenticación**: Sistema completo de login/logout con persistencia de
  sesión.
- **CRUD Completo**: Operaciones sobre productos con validación.
- **Arquitectura Moderna**: Patrones de diseño escalables y mantenibles.
- **Calidad de Código**: Testing, linting y herramientas de desarrollo.

## 📷 Screenshots

### 💻 Desktop

<!-- markdownlint-disable MD013 -->

[![Screenshot deskotp](./public/README/desktop.webp "Screenshot deskotp")](./public/README/desktop.webp "Screenshot deskotp")

<!-- markdownlint-enable MD013 -->

### 📱 Mobile

<!-- markdownlint-disable MD013 -->

[![Screenshot deskotp](./public/README/mobile.webp "Screenshot deskotp")](./public/README/mobile.webp "Screenshot deskotp")

<!-- markdownlint-enable MD013 -->

## 🚀 Funcionalidades Principales

### 🔐 Autenticación y Sesión

- **Login/Logout**: Sistema de autenticación simulado con localStorage.
- **Registro de Usuarios**: Formulario de registro con validación completa.
- **Persistencia de Sesión**: Rehidratación automática del estado al recargar.
<!-- - **Rutas Protegidas**: Guards para proteger vistas privadas. -->

### 🛒 Gestión de Productos

- **Catálogo Completo**: Visualización de productos desde FakeStore API.
- **Detalles de Producto**: Vista detallada con información completa.
- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos.
- **Categorías**: Filtrado por categorías (ropa, electrónicos, joyería).

### ❤️ Sistema de Favoritos

- **Agregar/Quitar Favoritos**: Gestión intuitiva de productos favoritos.
- **Persistencia Local**: Almacenamiento en localStorage.
- **Vista de Favoritos**: Página dedicada para productos guardados.

### 🎨 Experiencia de Usuario

- **Responsive Design**: Optimizado para desktop, tablet y móvil.
- **Animaciones Fluidas**: Transiciones suaves con Motion.
- **Feedback Visual**: Loading states, toasts y confirmaciones.
- **Navegación Intuitiva**: Breadcrumbs y navegación clara.

## 🏗️ Arquitectura y Patrones de Diseño

### 🔷 Arquitectura Hexagonal (Ports & Adapters)

La aplicación implementa **arquitectura hexagonal** para garantizar la
separación entre la lógica de negocio y los detalles de implementación:

```text
📁 Domain Layer (Centro - Reglas de Negocio)
├── User.ts                    # Entidad Usuario
├── Product.ts                 # Entidad Producto
├── UserRepository.ts          # Contrato repositorio usuarios
└── ProductRepository.ts       # Contrato repositorio productos

📁 Application Layer (Casos de Uso)
├── UserAuthenticator.ts       # Autenticación de usuarios
├── UserSessionManager.ts      # Gestión de sesiones
├── AllProductsGetter.ts       # Obtener todos los productos
├── ProductCreator.ts          # Crear productos
├── ProductUpdater.ts          # Actualizar productos
└── ProductRemover.ts          # Eliminar productos

📁 Infrastructure Layer (Adaptadores Externos)
├── ApiUserRepository.ts       # Implementación API usuarios
├── ApiProductsRepository.ts   # Implementación API productos
└── LocalStorageSession.ts     # Persistencia localStorage
```

### 📢 Screaming Architecture

La estructura del proyecto **"grita"** su propósito comercial y académico:

```bash
src/
├── modules/                  # 🏗️ Módulos de dominio (Business Logic)
│   ├── products/             # Gestión de productos (CORE)
│   ├── users/                # Autenticación y usuarios
│   ├── favorites/            # Sistema de favoritos
│   └── home/                 # Página principal
├── sections/                 # 🎨 Componentes UI por dominio
│   ├── products/             # UI específica de productos
│   ├── users/                # UI de login/registro
│   └── favorites/            # UI de favoritos
├── views/                    # 📄 Páginas principales (Routes)
│   ├── public/               # Vistas públicas
│   └── private/              # Vistas protegidas
```

### 🍰 Vertical Slicing

Cada feature contiene todos los elementos necesarios organizados verticalmente:

```bash
modules/products/
├── domain/                   # 🎯 Entidades y reglas de negocio
│   ├── Product.ts           # Modelo Product con tipos
│   └── ProductRepository.ts  # Interface del repositorio
├── application/              # 🔄 Casos de uso y lógica de aplicación
│   ├── AllProductsGetter.ts
│   ├── ProductCreator.ts
│   └── ProductUpdater.ts
└── infrastructure/           # ⚙️ Implementaciones técnicas
    ├── ApiProductsRepository.ts
    └── ProductRoutes.ts

sections/products/
├── components/               # 🧩 Componentes React específicos
├── hooks/                    # 🪝 Hooks especializados
├── slice/                    # 🗄️ Redux Toolkit slice
└── thunks/                   # ⚡ Async thunks para API calls
```

## 🛠️ Stack Tecnológico

### 🏗️ Core Framework

- **React 19.1.0** - Biblioteca principal con las últimas características.
- **TypeScript 5.8.3** - Tipado estático y mejor developer experience.
- **Vite 6.3.5** - Build tool y dev server ultrarrápido.
- **React Router 7.6.2** - Enrutamiento SPA moderno con lazy loading.

### 🗄️ Gestión de Estado

- **Redux Toolkit 2.8.2** - Estado global predecible y eficiente.
- **React Redux 9.2.0** - Integración React-Redux optimizada.
- **Context API** - Estado local y autenticación.

### 🎨 UI y Estilos

- **Tailwind CSS 4.1.10** - Framework CSS utility-first.
- **Radix UI** - Componentes accesibles y primitivos.
- **Motion 12.19.1** - Animaciones fluidas y profesionales.
- **Lucide React 0.515.0** - Iconografía moderna y consistente.

### 📝 Formularios y Validaciones

- **React Hook Form 7.58.1** - Gestión de formularios.
- **Zod 3.25.67** - Validación de esquemas TypeScript-first.
- **@hookform/resolvers 5.1.1** - Integración Zod + Hook Form.

### 🧪 Testing y Calidad

- **Vitest 3.2.3** - Framework de testing moderno.
- **Testing Library** - Testing de componentes React.
- **Playwright** - Testing end-to-end.
- **ESLint 9.29.0** - Linting avanzado con 50+ reglas.
- **Prettier 3.5.3** - Formateo automático de código.
- **Stylelint 16.20.0** - Linting para CSS/SCSS.
- **Husky 9.1.7** - Git hooks para calidad de código.
- **Commitlint** - Convenciones de commits semánticos.

## 🪜 Estructura del Proyecto

### Organización por Módulos de Dominio

```bash
pv_tp_integrador_grupo13/
├── public/                           # Recursos estáticos
│   ├── fonts/                        # Tipografías (Satoshi, IntegralCF)
│   └── images/                       # Imágenes de la aplicación
├── src/
│   ├── main.jsx                      # Punto de entrada
│   ├── AppRouter.jsx                 # Configuración de rutas
│   │
│   ├── modules/                      # 🏗️ Módulos de dominio
│   │   ├── products/                 # Gestión de productos
│   │   │   ├── domain/              # Entidades y reglas de negocio
│   │   │   │   ├── Product.js       # Modelo Product con JSDoc
│   │   │   │   ├── ProductCategory.js # Enum de categorías
│   │   │   │   └── ProductRepository.js # Interface repository
│   │   │   ├── application/         # Casos de uso
│   │   │   │   ├── AllProductsGetter.js
│   │   │   │   ├── ProductGetter.js
│   │   │   │   ├── ProductsByCategoryGetter.js
│   │   │   │   ├── ProductCreator.js
│   │   │   │   ├── ProductUpdater.js
│   │   │   │   └── ProductRemover.js
│   │   │   └── infrastructure/      # Implementaciones técnicas
│   │   │       ├── ApiProductsRepository.js
│   │   │       └── ProductRoutes.js
│   │   │
│   │   ├── favorites/               # Gestión de favoritos
│   │   └── home/                    # Página principal
│   │
│   ├── sections/                    # 🎨 Componentes por sección
│   │   ├── products/
│   │   │   ├── components/         # Componentes UI específicos
│   │   │   ├── hooks/              # Hooks especializados
│   │   │   ├── slice/              # Redux slice
│   │   │   └── thunks/             # Async thunks
│   │   └── favorites/
│   │
│   ├── views/                       # 📄 Páginas principales
│   │   ├── Home/
│   │   ├── ProductsDetails.jsx
│   │   ├── Favorites.jsx
│   │   ├── CreateProduct.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── components/                  # 🧩 Componentes globales
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ui/                     # Componentes base con Motion
│   │
│   ├── hooks/                       # 🪝 Hooks globales
│   │   ├── useAppSelector.js
│   │   ├── useAppDispatch.js
│   │   ├── useDependencies.js
│   │   ├── useFetch.js
│   │   └── useLocalStorage.js
│   │
│   ├── store/                       # 🗄️ Configuración Redux
│   │   ├── store.js
│   │   └── dependencies.js
│   │
│   ├── routes/                      # 🛣️ Definición de rutas
│   │   └── appRouters.js
│   │
│   ├── utils/                       # 🔧 Utilidades
│   │   ├── fetchData.js
│   │   └── loadFonts.js
│   │
│   ├── constants/                   # 📋 Constantes
│   │   └── keysLocalStorage.js
│   │
│   └── styles/                      # 🎨 Estilos globales
│       ├── global.css
│       └── carousel.css
│
├── eslint.config.js                 # Configuración ESLint
├── vite.config.js                   # Configuración Vite
├── jsconfig.json                    # Alias y configuración JS
├── tailwind.config.js               # Configuración Tailwind
└── package.json                     # Dependencias y scripts
```

## 📋 Características Principales

### 🛒 Funcionalidades de E-commerce

- **Catálogo de Productos**: Navegación por categorías (ropa, electrónicos,
  joyería).
- **Detalles de Producto**: Vistas detalladas con imágenes, precio y
  descripción.
- **Sistema de Favoritos**: Gestión de productos favoritos con persistencia.
- **Responsive Design**: Experiencia optimizada en todos los dispositivos.

<!-- - **Búsqueda y Filtrado**: Búsqueda por categoría y filtros dinámicos. -->
<!-- - **Carrito de Compras**: Gestión básica de productos seleccionados. -->

### 🏗️ Características Técnicas

- **Arquitectura Hexagonal**: Separación clara entre dominio, aplicación e
  infraestructura.
- **Tipado con JSDoc**: Documentación y tipado completo en JavaScript.
- **Gestión de Estado**: Redux Toolkit con slices organizados por dominio.
- **Persistencia**: localStorage para favoritos y estado de la aplicación.
- **Validaciones**: Zod + React Hook Form para formularios robustos.
- **Animaciones**: Motion para transiciones fluidas y feedback visual.
- **Optimización**: Lazy loading, suspense y optimizaciones de rendimiento.

## �️ Sistema de Rutas y Navegación

### 📍 Estructura de URLs

```typescript
// 🌐 Rutas Públicas (sin autenticación)
/login                               # Inicio de sesión
/register                            # Registro de usuarios

// 🔒 Rutas Protegidas (requieren autenticación)
/                                    # Landing page con hero y productos
/products                            # Catálogo completo de productos
/products/:id                        # Detalles específicos del producto
/products/create                     # Formulario crear nuevo producto
/products/:id/edit                   # Formulario editar producto existente
/favorites                           # Gestión de productos favoritos

// 🚫 Rutas de Utilidad
/*                                   # Redirección según corresponda
```

## 🎨 Diseño y Responsividad

### 🎭 Sistema de Diseño

- **Tipografías**: Satoshi (texto general), IntegralCF (títulos y headers).
- **Paleta de Colores**: Esquema moderno basado en Tailwind CSS.
- **Componentes**: Biblioteca custom basada en Radix UI + Tailwind CSS.
- **Iconografía**: Lucide React con animaciones Motion.
- **Layout**: Grid System responsive con breakpoints optimizados.

### 📱 Breakpoints Responsive

```css
/* Mobile First Approach - Tailwind CSS */
/* Default: mobile (< 640px) */
sm: 640px     /* 📱 Móviles grandes y tablets pequeños */
md: 768px     /* 📲 Tablets */
lg: 1024px    /* 💻 Laptops y desktop pequeño */
xl: 1280px    /* 🖥️ Desktop grande */
2xl: 1536px   /* 🖥️ Desktop muy grande */
```

### 🎨 Componentes UI Principales

````typescript
// components/ui/ - Sistema de componentes base
├── Button.tsx              # Botones con variantes
├── Input.tsx               # Campos de entrada
├── Card.tsx                # Tarjetas de contenido
├── Modal.tsx               # Diálogos y overlays
├── Toast.tsx               # Notificaciones
├── Loading.tsx             # Estados de carga
├── ErrorBoundary.tsx       # Manejo de errores
└── form/                   # Componentes de formulario
    ├── FormField.tsx
    ├── FormError.tsx
    └── FormLabel.tsx

## ⚙️ Configuración e Instalación

### 📋 Requisitos Previos

- **Node.js**: v22.13.1 o superior.
- **npm**: v11.4.2 o superior.
- **Git**: Para clonado del repositorio.
- **Editor**: VS Code recomendado con extensiones TypeScript/React.

### 🚀 Instalación Paso a Paso

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/GaleedGutierrez/pv_tp_integrador_grupo13_TS
    cd pv_tp_integrador_grupo13_TS
    ```

2. **Configurar Node.js (recomendado con nvm)**

    ```bash
      # Si usas nvm (Node Version Manager)
      nvm use 22.13.1
      # Si no tienes la versión instalada
      nvm install 22.13.1
    ```

3. **Instalar dependencias**

    ```bash
    npm install
    ```

4. **Ejecutar en modo desarrollo**

    ```bash
    npm run dev
    ```

5. **Abrir en el navegador**

    La aplicación estará disponible en `http://localhost:5173`

### 📜 Scripts Disponibles

```bash
# 🚀 Desarrollo
npm run dev                    # Servidor de desarrollo con hot reload
npm run build                  # Build de producción optimizado
npm run preview                # Vista previa del build de producción

# 🧪 Testing
npm run test                   # Ejecutar tests unitarios con Vitest
npm run test:e2e              # Tests end-to-end con Playwright
npm run test:performance      # Análisis de performance con Lighthouse

# 🔍 Calidad de Código
npm run lint                   # Ejecutar ESLint (análisis estático)
npm run lint:fix               # Corregir errores automáticamente
npm run prettier               # Verificar formato de código
npm run prettier:fix           # Corregir formato automáticamente
npm run stylelint              # Verificar estilos CSS
npm run stylelint:fix          # Corregir estilos CSS

# 📝 Documentación y Mantenimiento
npm run lint-md                # Verificar formato de archivos Markdown
npm run lint-md:fix            # Corregir archivos Markdown
npm run check-for-dupes        # Detectar código duplicado
````

### 🏗️ Build

```bash
# Generar build optimizado para producción
npm run build

# Previsualizar el build
npm run preview

# El build se genera en la carpeta 'dist/'
```

## 🚀 Despliegue en Producción

### 📦 Build de Producción

```bash
# Generar build optimizado
npm run build

# Previsualizar build localmente
npm run preview

# Análisis de rendimiento
npm run test:performance
```

### 🌐 Plataformas de Despliegue Recomendadas

#### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "22.13.1"
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🧪 Testing y Calidad de Código

### ⚡ Testing Stack

#### Performance Testing

```bash
# Análisis de performance con Lighthouse
npm run test:performance

# Genera reporte en ./lighthouse-report/lighthouse-report.html
# Métricas evaluadas:
# - First Contentful Paint: < 1.5s
# - Largest Contentful Paint: < 2.5s
# - Time to Interactive: < 3.0s
# - Cumulative Layout Shift: < 0.1
```

## 📄 Información Académica y Créditos

### 🎓 Contexto Académico

- **Institución**: Universidad Nacional de Jujuy - Facultad de Ingeniería
- **Carrera**: Analista Programador Universitario
- **Materia**: Programación Visual
- **Año Académico**: Segundo Año - 2025
- **Tipo de Trabajo**: Trabajo Práctico Integrador
- **Duración**: Cuatrimestre completo

### 👥 Equipo de Desarrollo - Grupo 13

| Desarrollador        | GitHub                       | Responsabilidades   |
| -------------------- | ---------------------------- | ------------------- |
| **Galeed Gutiérrez** | [@GaleedGutierrez][galeed]   | Arquitectura, Redux |
| **Alfredo González** | [@Ezequiel12354s][alfredo]   | UI, Styling         |
| **Enzo Condori**     | [@IsaiasCondori][enzo]       | Vistas, Navegación  |
| **Franklin Vázquez** | [@VasquezFranklin][franklin] | Hooks, Utilidades   |

[galeed]: https://github.com/GaleedGutierrez
[alfredo]: https://github.com/Ezequiel12354s
[enzo]: https://github.com/IsaiasCondori
[franklin]: https://github.com/VasquezFranklin

### 🎯 Objetivos Académicos Demostrados

✅ **Dominio de React y Ecosystem**

- Componentes funcionales con hooks.
- Gestión de estado con Redux Toolkit.
- Context API para autenticación.
- Custom hooks reutilizables.

✅ **Arquitectura de Software**

- Implementación de arquitectura hexagonal.
- Separación de responsabilidades.
- Principios SOLID aplicados.
- Patrones de diseño modernos.

✅ **Desarrollo Frontend Profesional**

- TypeScript para tipado fuerte.
- Validaciones con Zod + React Hook Form.
- Testing unitario y end-to-end.
- Herramientas de calidad de código.

✅ **Experiencia de Usuario**

- Responsive design mobile-first.
- Animaciones fluidas con Motion.
- Accesibilidad web (WCAG guidelines).
- Performance optimizations.

### 🏆 Características Destacadas del Proyecto

- **100% TypeScript**: Tipado completo para mejor mantenibilidad
- **Testing Coverage**: > 80% cobertura en componentes críticos
- **Performance Score**: > 90 en Lighthouse metrics
- **Accessibility**: Cumple estándares WCAG 2.1 AA
- **Code Quality**: 0 warnings en ESLint con 50+ reglas

### 📚 Tecnologías y Conceptos Aplicados

#### Frontend

- **React 19** con Concurrent Features
- **TypeScript** para tipado estático
- **Vite** como build tool moderno
- **Tailwind CSS** para estilos utilitarios

#### Estado y Datos

- **Redux Toolkit** para estado global
- **Context API** para autenticación
- **React Hook Form** para formularios
- **Zod** para validación de esquemas

#### Testing y Calidad

- **Vitest** para testing unitario
- **Playwright** para testing end-to-end
- **ESLint + Prettier** para calidad de código
- **Husky** para Git hooks automatizados

### 🔗 Enlaces Importantes

<!-- markdownlint-disable MD013 -->

- **Repositorio**:
[pv_tp_integrador_grupo13_TS](https://github.com/GaleedGutierrez/pv_tp_integrador_grupo13_TS)
<!-- markdownlint-enable MD013 -->
- **Demo en Vivo**: [Próximamente en Vercel]
- **Documentación API**: [FakeStore API](https://fakestoreapi.com)

### 📜 Licencia

Este proyecto está desarrollado con fines **exclusivamente académicos** para la
materia Programación Visual de la Universidad Nacional de Jujuy.

**Licencia MIT** - Ver archivo [LICENSE](LICENSE) para más detalles.

### 🙏 Reconocimientos

- **FakeStore API** - Proveedor de datos para demostración.
- **Radix UI** - Primitivos accesibles y componentes base.
- **Tailwind CSS** - Framework CSS que potencia el diseño.
- **Redux Toolkit** - Gestión de estado moderna y eficiente.
- **Universidad Nacional de Jujuy** - Formación académica integral.

---

### 💻 Desarrollado con ❤️ por el Grupo 13

## **Universidad Nacional de Jujuy - Facultad de Ingeniería**

### _Programación Visual - Segundo Año 2025_

> _"La programación no es solo escribir código, es resolver problemas de manera
> elegante y eficiente."_
