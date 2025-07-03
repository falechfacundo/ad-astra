# AD-ASTRA - Sistema de Autenticación con Clerk

Este proyecto incluye un sistema completo de autenticación con Google OAuth usando Clerk para la gestión de contratos y propuestas.

## 🚀 Configuración Rápida

### 1. Configurar Clerk

1. Ve a [Clerk Dashboard](https://dashboard.clerk.com/)
2. Crea una nueva aplicación
3. En el dashboard, ve a "API Keys"
4. Copia tu **Publishable key**

### 2. Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env.local`:

   ```bash
   copy .env.example .env.local
   ```

2. Edita `.env.local` y reemplaza la clave:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_tu-clave-real-aqui
   ```

### 3. Configurar Google OAuth en Clerk

1. En tu dashboard de Clerk, ve a "Social Connections"
2. Habilita "Google"
3. Configura las credenciales de Google OAuth (opcional, Clerk proporciona defaults para desarrollo)

### 4. Ejecutar la Aplicación

```bash
npm install
npm run dev
```

## 🔐 Funcionalidades de Autenticación

### Páginas Protegidas

- `/proposal` - Requiere autenticación para acceder

### Páginas de Autenticación

- `/sign-in` - Página de inicio de sesión
- `/sign-up` - Página de registro

### Funcionalidades

- ✅ Login/Register con Google OAuth
- ✅ Protección de rutas
- ✅ Información del usuario en la interfaz
- ✅ Firma de contratos con datos del usuario autenticado
- ✅ Logout y gestión de perfil

## 🛠️ Desarrollo

### Modo Desarrollo

El proyecto detecta automáticamente si está en modo desarrollo y:

- Usa datos mock para las propuestas
- Muestra información de debug
- Simula operaciones de base de datos

### Modo Producción

En producción:

- Se conecta a los workers de Cloudflare
- Guarda datos reales de firmas
- Incluye información del usuario autenticado en los contratos

## 📄 Firma de Contratos

Cuando un usuario autenticado firma un contrato, se guarda:

- Nombre completo del usuario
- Email del usuario
- ID único del usuario de Clerk
- Timestamp de la firma
- Información de la sesión

## 🎨 Interfaz de Usuario

- Header con información del usuario y botón de perfil
- Indicador visual de usuario autenticado en el proceso de firma
- Integración fluida con la UI existente de NextUI
- Protección visual cuando no está autenticado

## 🔧 Solución de Problemas

### Error: "Missing Publishable Key"

- Verifica que el archivo `.env.local` existe
- Confirma que la variable `VITE_CLERK_PUBLISHABLE_KEY` está configurada
- Reinicia el servidor de desarrollo después de cambiar variables de entorno

### Problemas de Autenticación

- Verifica que Google OAuth está habilitado en Clerk
- Confirma que la URL de desarrollo está en la lista blanca de Clerk
- Revisa la consola del navegador para errores específicos

## 📚 Documentación Adicional

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React Integration](https://clerk.com/docs/quickstarts/react)
- [Google OAuth Setup](https://clerk.com/docs/authentication/social-connections/google)
