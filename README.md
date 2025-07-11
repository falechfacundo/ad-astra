# 🚀 Ad Astra - Landing Page

![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![NextUI](https://img.shields.io/badge/NextUI-2.4.2-000000?style=for-the-badge&logo=nextui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.2.13-ff6b6b?style=for-the-badge&logo=framer&logoColor=white)

Landing page moderna y multiidioma para Ad Astra, una empresa de desarrollo tecnológico con visión global. Construida con React y tecnologías de vanguardia para ofrecer una experiencia de usuario excepcional.

## 📋 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [🛠 Stack Tecnológico](#-stack-tecnológico)
- [🏗 Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [🔧 Variables de Entorno](#-variables-de-entorno)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🧩 Componentes Principales](#-componentes-principales)
- [🔄 Gestión de Estado](#-gestión-de-estado)
- [🌐 Internacionalización](#-internacionalización)
- [🎨 Sistema de Diseño](#-sistema-de-diseño)
- [🔨 Desarrollo](#-desarrollo)
- [🚢 Despliegue](#-despliegue)
- [🤝 Contribución](#-contribución)
- [📞 Soporte](#-soporte)
- [📄 Licencia](#-licencia)

## ✨ Características Principales

### 🌟 Experiencia de Usuario

- **Diseño Moderno**: Interfaz limpia y profesional con animaciones fluidas
- **Responsive Design**: Optimizado para todos los dispositivos y tamaños de pantalla
- **Animaciones Avanzadas**: Implementadas con Framer Motion para transiciones suaves
- **Efectos Visuales**: Patrones animados, meteoros y elementos interactivos

### 🌍 Multiidioma

- **Soporte Bilingüe**: Español e Inglés completamente implementados
- **Detección Automática**: Idioma basado en configuración del navegador
- **Cambio Dinámico**: Switching en tiempo real sin recargar página

### 📧 Funcionalidades de Contacto

- **Formularios Integrados**: Sistema de contacto con EmailJS
- **Newsletter**: Suscripción a boletín informativo
- **Notificaciones**: Toast messages para feedback del usuario

### 🎯 Secciones Especializadas

- **Hero Section**: Presentación impactante con elementos animados
- **Servicios**: Catálogo de servicios con diseño tipo Bento Grid
- **Proyectos**: Portafolio de trabajos realizados
- **Referencias**: Testimonios de clientes
- **Contacto**: Múltiples formas de comunicación

## 🛠 Stack Tecnológico

### Frontend

- **React** 18.3.1 - Biblioteca principal para UI
- **Vite** - Build tool y servidor de desarrollo
- **React Router DOM** 6.24.1 - Navegación y routing
- **Framer Motion** 11.2.13 - Animaciones y transiciones

### UI/UX

- **TailwindCSS** 3.4.4 - Framework de estilos utilitarios
- **NextUI** 2.4.2 - Componentes de interfaz modernos
- **Magic UI** - Componentes personalizados con efectos avanzados
- **React Icon Cloud** - Nube de iconos 3D interactiva

### Internacionalización

- **i18next** 23.14.0 - Framework de internacionalización
- **react-i18next** 15.0.1 - Integración con React

### Servicios Externos

- **EmailJS** 4.4.1 - Envío de emails desde el frontend
- **Clerk** 5.32.3 - Autenticación y gestión de usuarios
- **LibSQL Client** 0.15.9 - Cliente de base de datos

### Estado y Utilidades

- **Zustand** 5.0.6 - Gestión de estado global ligera
- **React Toastify** 10.0.5 - Notificaciones toast
- **Clsx** 2.1.1 - Utilidad para clases CSS condicionales

## 🏗 Arquitectura del Proyecto

```
┌─────────────────────────────────────────┐
│              Frontend App               │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐   │
│  │    Pages    │  │   Components    │   │
│  │             │  │                 │   │
│  │ • Home      │  │ • Layout        │   │
│  │ • About     │  │ • Molecules     │   │
│  │ • Careers   │  │ • Atoms         │   │
│  │ • Contact   │  │ • Magic UI      │   │
│  │ • FAQ       │  └─────────────────┘   │
│  └─────────────┘                        │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐   │
│  │   Context   │  │  Translations   │   │
│  │             │  │                 │   │
│  │ • Language  │  │ • i18n Config   │   │
│  │ • Modal     │  │ • ES/EN Files   │   │
│  │ • Toast     │  │ • Components    │   │
│  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────┤
│              External Services          │
│  ┌─────────────┐  ┌─────────────────┐   │
│  │   EmailJS   │  │     Clerk       │   │
│  │  ┌───────┐  │  │  ┌───────────┐  │   │
│  │  │ Email │  │  │  │    Auth   │  │   │
│  │  │Service│  │  │  │  Service  │  │   │
│  │  └───────┘  │  │  └───────────┘  │   │
│  └─────────────┘  └─────────────────┘   │
└─────────────────────────────────────────┘
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 o **yarn** >= 1.22.0
- **Git** para control de versiones

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/ad-astra/landing-page.git
cd landing-page
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env.local
```

4. **Iniciar servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
```

5. **Abrir en navegador**

```
http://localhost:5173
```

## 🔧 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_tu_clerk_key

# Database Configuration
VITE_LIBSQL_URL=libsql://tu-database-url
VITE_LIBSQL_AUTH_TOKEN=tu_auth_token

# Application Settings
VITE_APP_NAME=Ad Astra
VITE_APP_URL=https://adastra.com
VITE_DEFAULT_LANGUAGE=es
```

### Descripción de Variables

| Variable                     | Descripción                                  | Requerida |
| ---------------------------- | -------------------------------------------- | --------- |
| `VITE_EMAILJS_SERVICE_ID`    | ID del servicio EmailJS para envío de emails | ✅        |
| `VITE_EMAILJS_TEMPLATE_ID`   | ID del template de email                     | ✅        |
| `VITE_EMAILJS_PUBLIC_KEY`    | Clave pública de EmailJS                     | ✅        |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clave pública de Clerk para autenticación    | ❌        |
| `VITE_LIBSQL_URL`            | URL de conexión a base de datos LibSQL       | ❌        |
| `VITE_LIBSQL_AUTH_TOKEN`     | Token de autenticación para base de datos    | ❌        |

## 📁 Estructura del Proyecto

```
landing/
├── public/                          # Recursos estáticos
│   ├── esanad_fondo.png            # Imágenes de proyectos
│   ├── hambur_fondo.png
│   ├── suits_desktop.png
│   ├── Logo.svg                    # Logotipo de la empresa
│   └── ...
├── src/
│   ├── components/                  # Componentes reutilizables
│   │   ├── assets/                 # Recursos de componentes
│   │   │   ├── Logo.jsx            # Componente del logo
│   │   │   └── icons/              # Iconos SVG como componentes
│   │   ├── atoms/                  # Componentes atómicos
│   │   │   ├── services.jsx        # Servicios individuales
│   │   │   ├── ApplyBTN.jsx        # Botón de aplicación
│   │   │   └── ...
│   │   ├── layout/                 # Componentes de layout
│   │   │   ├── Layout.jsx          # Layout principal
│   │   │   ├── Header.jsx          # Cabecera
│   │   │   ├── Footer.jsx          # Pie de página
│   │   │   └── transition.jsx      # Transiciones
│   │   ├── magic_ui/               # Componentes con efectos especiales
│   │   │   ├── BentoGrid.jsx       # Grid tipo Bento
│   │   │   ├── AnimatedGridPattern.jsx
│   │   │   ├── Meteors.jsx         # Efecto meteoros
│   │   │   └── ...
│   │   └── moleculas/              # Componentes complejos
│   │       ├── Hero.jsx            # Sección hero
│   │       ├── Services.jsx        # Sección servicios
│   │       ├── Projects.jsx        # Sección proyectos
│   │       ├── Contact.jsx         # Sección contacto
│   │       └── ...
│   ├── context/                    # Contextos de React
│   │   ├── Language.jsx            # Contexto de idioma
│   │   ├── ModalProvider.jsx       # Proveedor de modales
│   │   └── ToastProvider.jsx       # Proveedor de notificaciones
│   ├── lib/                        # Utilidades
│   │   └── utils.js                # Funciones utilitarias
│   ├── pages/                      # Páginas de la aplicación
│   │   ├── Home.jsx                # Página principal
│   │   ├── About.jsx               # Página acerca de
│   │   ├── Careers.jsx             # Página carreras
│   │   ├── Contact.jsx             # Página contacto
│   │   └── ...
│   ├── translations/               # Archivos de traducción
│   │   ├── i18n.jsx                # Configuración i18n
│   │   ├── en/                     # Traducciones en inglés
│   │   │   ├── about.json
│   │   │   ├── careers.json
│   │   │   └── components/         # Traducciones por componente
│   │   └── es/                     # Traducciones en español
│   │       ├── about.json
│   │       ├── careers.json
│   │       └── components/
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Punto de entrada
│   └── index.css                   # Estilos globales
├── components.json                 # Configuración de componentes UI
├── tailwind.config.js              # Configuración TailwindCSS
├── postcss.config.js               # Configuración PostCSS
├── package.json                    # Dependencias y scripts
└── README.md                       # Este archivo
```

## 🧩 Componentes Principales

### Layout Components

- **`Layout.jsx`**: Estructura principal con header, main y footer
- **`Header.jsx`**: Navegación responsive con selector de idioma
- **`Footer.jsx`**: Pie de página con links y información de contacto

### Magic UI Components

- **`BentoGrid.jsx`**: Sistema de grid moderno para mostrar servicios
- **`AnimatedGridPattern.jsx`**: Patrones de fondo animados
- **`Meteors.jsx`**: Efecto visual de meteoros
- **`VelocityScroll.jsx`**: Texto con scroll horizontal animado
- **`IconCloud.jsx`**: Nube 3D interactiva de tecnologías

### Molecular Components

- **`Hero.jsx`**: Sección principal con animaciones y call-to-action
- **`Services.jsx`**: Presentación de servicios en formato Bento Grid
- **`Projects.jsx`**: Portafolio de proyectos con modales
- **`References.jsx`**: Carrusel de testimonios de clientes
- **`Contact.jsx`**: Formulario de contacto integrado con EmailJS

### Atomic Components

- **`ApplyBTN.jsx`**: Botón de aplicación con estilos consistentes
- **`services.jsx`**: Componentes individuales para cada servicio
- **`Analytics.jsx`**: Componente de analytics y métricas

## 🔄 Gestión de Estado

### Zustand Store

```javascript
// Estado global para modales, idioma y configuraciones
const useStore = create((set) => ({
  // Modal state
  isModalOpen: false,
  modalContent: null,

  // Language state
  currentLanguage: "es",

  // UI state
  isLoading: false,

  // Actions
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  setLanguage: (lang) => set({ currentLanguage: lang }),
}));
```

### Context Providers

- **`LanguageContext`**: Gestión global del idioma seleccionado
- **`ModalProvider`**: Control de modales y overlays
- **`ToastProvider`**: Sistema de notificaciones toast

## 🌐 Internacionalización

### Configuración i18n

- **Idiomas soportados**: Español (es) y Inglés (en)
- **Detección automática**: Basada en `navigator.language`
- **Fallback**: Español como idioma por defecto
- **Namespaces**: Organizados por páginas y componentes

### Estructura de Traducciones

```
translations/
├── en/
│   ├── about.json          # Página Acerca de
│   ├── careers.json        # Página Carreras
│   ├── faq.json           # Página FAQ
│   └── components/        # Traducciones de componentes
│       ├── header.json
│       ├── footer.json
│       ├── hero.json
│       └── ...
└── es/
    ├── about.json
    ├── careers.json
    ├── faq.json
    └── components/
        ├── header.json
        ├── footer.json
        ├── hero.json
        └── ...
```

### Uso en Componentes

```jsx
import { useTranslation } from "react-i18next";

function Component() {
  const { t } = useTranslation("namespace");
  return <h1>{t("title")}</h1>;
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
/* Colores principales */
--electric-violet: #ae35ff    /* Innovación y creatividad */
--turquoise: #00d1bf         /* Aspiración y claridad */

/* Gradientes personalizados */
--gradient-primary: linear-gradient(135deg, #ae35ff 0%, #00d1bf 100%)
--gradient-secondary: linear-gradient(45deg, #9b0fff 0%, #14edd8 100%)
```

### Tipografía

- **Font Family**: Sistema de fuentes nativo del navegador
- **Escalas**: Responsive typography con clamp()
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

### Componentes UI

- **NextUI**: Sistema de componentes base
- **Magic UI**: Componentes personalizados con animaciones
- **TailwindCSS**: Clases utilitarias para estilos

### Animaciones

- **Framer Motion**: Transiciones de página y componentes
- **CSS Animations**: Efectos de fondo y patrones
- **Keyframes**: Animaciones personalizadas (meteors, marquee)

## 🔨 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo en puerto 5173
npm run build           # Construye la aplicación para producción
npm run preview         # Previsualiza el build de producción
npm run lint            # Ejecuta ESLint para revisar código
```

### Herramientas de Desarrollo

- **ESLint**: Linter configurado para React y hooks
- **Prettier**: Formateador de código (configurar en editor)
- **Vite**: Build tool con HMR (Hot Module Replacement)
- **PostCSS**: Procesador de CSS con autoprefixer

### Convenciones de Código

- **Componentes**: PascalCase para nombres de archivos y componentes
- **Variables**: camelCase para variables y funciones
- **Constantes**: SCREAMING_SNAKE_CASE para constantes
- **Archivos**: kebab-case para archivos no-componente

### Estructura de Commits

```
feat: añadir nueva funcionalidad
fix: corregir bug existente
docs: actualizar documentación
style: cambios de formato/estilo
refactor: refactorización de código
test: añadir o modificar tests
chore: tareas de mantenimiento
```

### Testing (Recomendado)

```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 🚢 Despliegue

### Variables de Producción

```env
VITE_APP_ENV=production
VITE_APP_URL=https://tu-dominio.com
VITE_EMAILJS_SERVICE_ID=servicio_produccion
VITE_EMAILJS_TEMPLATE_ID=template_produccion
VITE_EMAILJS_PUBLIC_KEY=clave_produccion
```

### Plataformas Recomendadas

#### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

#### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
# Environment variables: configurar en panel de Netlify
```

#### GitHub Pages

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Añadir script en package.json
"deploy": "gh-pages -d dist"

# Desplegar
npm run build && npm run deploy
```

### Consideraciones de Producción

- **Performance**: Lazy loading de componentes pesados
- **SEO**: Meta tags dinámicos por página
- **Analytics**: Integración con Google Analytics
- **Monitoring**: Error tracking con Sentry
- **CDN**: Optimización de imágenes con servicios externos

### Optimizaciones

- **Code Splitting**: Implementado automáticamente por Vite
- **Tree Shaking**: Eliminación de código no utilizado
- **Asset Optimization**: Compresión de imágenes y recursos
- **Bundle Analysis**: Usar `npm run build -- --analyze`

## 🤝 Contribución

### Proceso de Contribución

1. **Fork del repositorio**

```bash
git clone https://github.com/tu-usuario/landing-page.git
```

2. **Crear rama de feature**

```bash
git checkout -b feature/nueva-funcionalidad
```

3. **Realizar cambios y commits**

```bash
git add .
git commit -m "feat: descripción de la funcionalidad"
```

4. **Push y Pull Request**

```bash
git push origin feature/nueva-funcionalidad
# Crear PR en GitHub
```

### Estándares de Código

- **ESLint**: Seguir configuración existente
- **Componentes**: Un componente por archivo
- **Propiedades**: Usar PropTypes o TypeScript
- **Testing**: Añadir tests para nuevas funcionalidades
- **Documentación**: Actualizar README y comentarios

### Reportar Issues

- **Bug Reports**: Incluir pasos para reproducir
- **Feature Requests**: Descripción detallada del requerimiento
- **Questions**: Usar Discussions para preguntas generales

### Code Review

- **Responsiveness**: Verificar en diferentes dispositivos
- **Accessibility**: Seguir estándares WCAG 2.1
- **Performance**: Evaluar impacto en métricas Core Web Vitals
- **Security**: Revisar vulnerabilidades de dependencias

## 📞 Soporte

### Información de Contacto

- **Email**: desarrollo@adastra.com
- **Website**: [https://adastra.com](https://adastra.com)
- **LinkedIn**: [Ad Astra Company](https://linkedin.com/company/adastra)

### Enlaces Útiles

- **Documentación React**: [https://react.dev](https://react.dev)
- **TailwindCSS Docs**: [https://tailwindcss.com](https://tailwindcss.com)
- **NextUI Components**: [https://nextui.org](https://nextui.org)
- **Framer Motion**: [https://framer.com/motion](https://framer.com/motion)
- **i18next Guide**: [https://react.i18next.com](https://react.i18next.com)

### Recursos Adicionales

- **Design System**: Figma workspace con componentes
- **Brand Guidelines**: Manual de marca y assets
- **API Documentation**: Endpoints y schemas disponibles
- **Deployment Guide**: Guía detallada de despliegue

### FAQ Técnicas

**P: ¿Cómo cambiar el idioma por defecto?**
R: Modificar `defaultLanguage` en `src/translations/i18n.jsx`

**P: ¿Cómo añadir nuevas traducciones?**
R: Crear archivos JSON en `src/translations/[lang]/` y registrar en i18n.jsx

**P: ¿Cómo personalizar el tema?**
R: Modificar variables CSS en `tailwind.config.js` y `src/index.css`

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2024 Ad Astra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Restricciones de Uso

- **Marca registrada**: El nombre "Ad Astra" y logo son propiedad de la empresa
- **Contenido**: Textos e imágenes específicas de la empresa no son reutilizables
- **Código**: El código fuente puede ser utilizado según términos de la licencia MIT

---

**Desarrollado con ❤️ por el equipo de Ad Astra**

_"Per aspera ad astra" - A través de las dificultades hacia las estrellas_
