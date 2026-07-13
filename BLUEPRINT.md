# Blueprint: Real Estate CRM (Proyecto 08)

## 📌 Resumen del Proyecto
Un panel administrativo avanzado para agencias inmobiliarias. Permite a los agentes inmobiliarios (brokers) gestionar propiedades, clientes, citas y visualizar métricas de rendimiento. Este proyecto marca la introducción formal de modelado de base de datos SQL (DER) integrado en el flujo de front-end.

## 🛠️ Stack Tecnológico
- **Core:** React, TypeScript, Vite
- **Estilos:** Tailwind CSS, Lucide React (iconos)
- **Estado Global:** Zustand
- **Formularios y Validación:** React Hook Form + Zod
- **Gráficos:** Recharts
- **Base de Datos (Teórica):** Esquemas SQL y diagrama DER para MySQL/PostgreSQL
- **Calidad:** ESLint (oxlint), Prettier, Husky

---

## 🗺️ Roadmap y Milestones (20 Issues Planificadas)

### Milestone 1: Fundación y Arquitectura
*Configuración inicial, dependencias y reglas de enrutamiento.*
- **Issue #1:** Configurar repositorio base con Vite, React y TypeScript (Label: `type: chore`)
- **Issue #2:** Instalar e inicializar Tailwind CSS y variables de diseño (Label: `type: chore`, `area: css`)
- **Issue #3:** Configurar linter (oxlint) y reglas estrictas de TypeScript (Label: `type: chore`)
- **Issue #4:** Crear estructura base de directorios (components, ui, hooks, utils, store) (Label: `type: architecture`)

### Milestone 2: Modelado de Datos y Estado Global
*Definición del esquema SQL y el estado de la aplicación.*
- **Issue #5:** Diseñar esquema SQL para `Properties`, `Agents`, `Clients`, `Appointments` (Label: `type: architecture`, `area: database`)
- **Issue #6:** Exportar archivo `schema.sql` y añadir imagen del diagrama DER (Label: `type: docs`, `area: database`)
- **Issue #7:** Crear servicios de Mock (APIs falsas) basados en el esquema SQL (Label: `type: feature`)
- **Issue #8:** Implementar estado global para Autenticación de Agentes con Zustand (Label: `type: feature`)
- **Issue #9:** Implementar estado global para filtros y configuración (Label: `type: feature`)

### Milestone 3: Diseño del Sistema y Componentes UI Core
*Creación de componentes reutilizables (Botones, Inputs, Cards).*
- **Issue #10:** Crear layout principal (Sidebar y Header responsivos) (Label: `type: feature`, `area: ui/ux`)
- **Issue #11:** Construir componentes UI genéricos (Button, Input, Badge) (Label: `type: feature`, `area: ui/ux`)
- **Issue #12:** Implementar sistema tipográfico y de colores corporativos (Label: `type: style`, `area: css`)
- **Issue #13:** Construir tarjetas de métricas para el Dashboard (Ventas, Visitas, Conversión) (Label: `type: feature`)

### Milestone 4: Gestión de Propiedades y Clientes (CRUD)
*Formularios complejos y tablas de datos.*
- **Issue #14:** Implementar listado de propiedades con Data Table (Label: `type: feature`)
- **Issue #15:** Integrar React Hook Form y Zod para la creación de inmuebles (Label: `type: feature`)
- **Issue #16:** Desarrollar panel lateral de detalles de la propiedad (Label: `type: feature`)
- **Issue #17:** Implementar vista de Calendario para citas y visitas (Label: `type: feature`)

### Milestone 5: Refinamiento, Animaciones y Lanzamiento
*El toque de calidad final y documentación.*
- **Issue #18:** Pulir diseño responsivo (Mobile-first check) y accesibilidad (Label: `type: style`, `area: responsive`)
- **Issue #19:** Auditar comentarios del código (Eliminar descripciones "WHAT", mantener "WHY" en inglés) (Label: `type: refactor`)
- **Issue #20:** Generar capturas de pantalla automatizadas y redactar el README final (Label: `type: docs`)
