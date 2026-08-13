# Proyecto 08 - CRM Inmobiliario 🏠

Un CRM inmobiliario completo diseñado para que los agentes administren propiedades, citas, y visualicen métricas clave del negocio. Creado como parte de la currícula progresiva, este proyecto se enfoca en la gestión de estado global, componentes reusables de interfaz de usuario, y diseño responsivo utilizando tecnologías modernas.

## 🌟 Características

- **Autenticación Mock:** Sistema de autenticación de estado simulado y rutas protegidas.
- **Dashboard Analítico:** Tarjetas de métricas con gráficos (Ventas, Visitas, Conversiones) utilizando Recharts.
- **Gestión de Propiedades:** Tabla de datos con filtros en tiempo real por estado, tipo, precio y más.
- **Sistema de Calendario:** Vista de calendario para gestionar visitas y reuniones.
- **Formularios Robustos:** Creación de inmuebles con validación estricta a través de React Hook Form y Zod.
- **Diseño System Propio:** Componentes primitivos (Input, Badge, Button, Card) creados desde cero e integrados con Tailwind v4.

## 🚀 Tecnologías Utilizadas

- **Core:** React 19 + TypeScript + Vite.
- **Estilos:** Tailwind CSS v4, Lucide React (íconos).
- **Gestión de Estado:** Zustand (Auth, Properties, Filters).
- **Formularios:** React Hook Form + Zod.
- **Gráficos:** Recharts.

## 📦 Instalación y Uso

1. Clonar el repositorio.
2. Navegar al directorio `08-real-estate-crm`:
   ```bash
   cd 08-real-estate-crm
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

*Nota: Inicie sesión con cualquier correo que contenga '@' y una contraseña mayor a 5 caracteres (Simulación).*

## 🧩 Estructura de Componentes

La estructura de carpetas prioriza la separación por características (Feature-driven):
- `src/components/ui/` - Componentes atómicos e independientes (Botones, inputs, tarjetas).
- `src/components/layout/` - Sidebar, Header y envoltorio principal.
- `src/components/properties/` - Formularios, tablas y paneles de propiedades.
- `src/store/` - Estado global con Zustand.
- `src/services/` - Capa de API mock para asincronía simulada.

## 🗄️ Modelo de Base de Datos

El proyecto incluye un modelo relacional teórico (esquema SQL, datos de ejemplo y diagrama DER) para las entidades del CRM: agentes, clientes, propiedades y citas. Ver [`database/README.md`](./database/README.md).

## 🛠 Próximos Pasos & Lecciones Aprendidas

En este proyecto consolidamos el uso avanzado de **Zustand** para dividir stores (Autenticación, Filtros y Propiedades) y el manejo de esquemas con **Zod**, preparando el terreno para interacciones con bases de datos reales en los próximos proyectos de la serie.
