# InmoFlow CRM — Portal Inmobiliario & Gestión de Propiedades (Full Stack)

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success?style=flat-square&logo=github&logoColor=white)](https://alxnrocha.github.io/real-estate-crm/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express 5](https://img.shields.io/badge/Express-5.0-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL 8.4 LTS](https://img.shields.io/badge/MySQL-8.4_LTS-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![SQL DDL](https://img.shields.io/badge/SQL-DDL_&_Relational_Schema-00758F?style=flat-square&logo=sqlite&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Proyecto 08 del Portafolio Profesional** — Aplicación web Full Stack para agencias y agentes inmobiliarios con gestión de propiedades, clientes y citas.  
> 🔗 **Demo en Vivo en GitHub Pages:** [https://alxnrocha.github.io/real-estate-crm/](https://alxnrocha.github.io/real-estate-crm/)

> **Nota de honestidad del portafolio:** la demo publicada en GitHub Pages corresponde solo al frontend estático. Las funcionalidades de login, listado y creación de propiedades requieren el servidor API local (o desplegado) para funcionar con datos reales.

---

## ✨ Características Principales

### 🚀 Frontend (React 19 + TypeScript + Tailwind CSS v4)

- **Directorio y Filtros Multicriterio de Inmuebles:** Filtrado en tiempo real por tipo de propiedad, rango de precio, número de habitaciones, ubicación y estado comercial (`Available`, `Sold`, `Rented`, `Pending`).
- **Dashboard Analítico con Recharts:** Métricas de volumen de ventas, tasa de conversión y distribución de visitas comerciales.
- **Formularios con Validación Estricta:** Creación y edición de inmuebles mediante React Hook Form y esquemas de validación con Zod.
- **Gestión de Estado Modular con Zustand:** Stores desacoplados para autenticación, catálogo de propiedades y filtros globales.
- **Cliente HTTP Real:** `src/services/api.ts` sustituye al antiguo mock; consume la API con autenticación Bearer y normaliza la respuesta (BBDD `image_url` → modelo `image`).

### 🛡️ Backend & Datos (Node.js 22 + Express 5 + Sequelize + MySQL 8.4 LTS)

- **Autenticación JWT & BCrypt:** Registro, inicio de sesión y perfil del agente (`/api/v1/auth/me`) con control de roles (`admin`, `agent`).
- **Modelo Relacional de 4 Entidades:** `agents`, `clients`, `properties` y `appointments` con claves foráneas, `ON DELETE` y `CHECK` constraints e índices de optimización.
- **CRUD Completo:** endpoints REST para propiedades, clientes y citas/visitas con asociaciones (propiedad ↔ agente ↔ cliente).
- **Filtros, Ordenación y Paginación Server-Side:** listados validados con esquemas de Zod en el `query` (`type`, `status`, `min_price`, `max_price`, `min_bedrooms`, `search`, `sort_by`, `sort_order`, `page`, `limit`).
- **Migrations Versionadas:** esquema gestionado con migraciones SQL numeradas (`server/migrations/*.sql`) y runner que registra cada migración en `schema_migrations` (`npm run db:migrate` / `npm run db:rollback`).
- **Dashboard API:** métricas de portfolio (`/api/v1/dashboard/overview`) y actividad reciente (`/api/v1/dashboard/activity`).
- **Tests de Integración con MySQL:** flujo end-to-end (registro → JWT → cliente → propiedad → cita → métricas) que se omite automáticamente si la base de datos no está disponible.

---

## 🏛️ Estructura del Proyecto

```text
08-real-estate-crm/
├── .github/workflows/ci.yml       # CI (lint, migraciones, tests con MySQL, build, deploy)
├── server/                        # Backend (Node.js 22 + Express 5 + Sequelize + MySQL)
│   ├── migrations/                # Migraciones SQL versionadas (up/down)
│   ├── src/
│   │   ├── __tests__/             # Pruebas de integración con Supertest (+ MySQL)
│   │   ├── config/                # env.ts y database.ts (Sequelize)
│   │   ├── controllers/           # auth, property, client, appointment, dashboard
│   │   ├── middlewares/           # auth.middleware.ts y validate.middleware.ts (body & query)
│   │   ├── models/                # Agent, Client, Property, Appointment y asociaciones
│   │   ├── routes/                # auth, property, client, appointment, dashboard
│   │   ├── schemas/               # Esquemas Zod
│   │   ├── scripts/               # migrate.ts (runner) y seed.ts (población ORM)
│   │   └── server.ts              # Servidor Express
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── src/                           # Frontend (Vite 8 + React 19 + Tailwind v4)
│   ├── components/                # layout, auth, dashboard, properties, calendar, ui
│   ├── services/api.ts            # Cliente HTTP real (fetch + Bearer)
│   ├── store/                     # Stores Zustand (Auth, Properties, Filters)
│   ├── utils/mockData.ts          # Tipos del modelo de propiedad
│   ├── App.tsx                    # Shell de la aplicación
│   └── main.tsx                   # Entrada React 19
└── package.json                   # Scripts raíz (frontend + server)
```

---

## ⚡ Guía de Inicio Rápido

### 1. Clonar, instalar Frontend y Backend

```bash
git clone https://github.com/alxnrocha/real-estate-crm.git
cd real-estate-crm

# Frontend
npm install

# Backend
npm install --prefix server
```

### 2. Configurar Variables de Entorno del Backend

Cree `server/.env` a partir de `server/.env.example`:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=real_estate_crm
JWT_SECRET=real_estate_secret_key_2026
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Aplicar Migraciones y Poblar Datos

```bash
# Crea la base de datos y aplica las migraciones versionadas
npm run db:migrate

# Puebla con datos de demostración (aplica migraciones si hace falta)
npm run seed
```

### 4. Iniciar Frontend y Backend

```bash
npm run dev            # Frontend (http://localhost:5173)
npm run dev:server     # Backend  (http://localhost:5000/api/v1)
```

---

## 🔑 Credenciales de Demostración

| Rol                     | Correo Electrónico         | Contraseña     |
| :---------------------- | :------------------------- | :------------- |
| **Administrador**       | `agente@inmoflow.com`      | `Password123!` |
| **Agente Inmobiliario** | `laura.vidal@inmoflow.com` | `Password123!` |

_(La pantalla de login ya viene preconfigurada con las credenciales de administrador)._

---

## 🧪 Calidad de Código y Pruebas

```bash
npm run lint            # Oxlint (frontend + backend)
npm test:server         # Pruebas server: unitarias + integración (con MySQL disponible)
npm run build           # Build frontend (Vite)
npm run build:server    # Build backend (TypeScript)
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para más detalles.

**Autor:** [Alexandre Rocha](https://github.com/alxnrocha)
