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

---

## 🌟 Visión General & Propuesta de Valor

**InmoFlow CRM** es una solución Full Stack orientada a la digitalización integral de agencias y consultorías inmobiliarias.

Centraliza la cartera de inmuebles en venta y alquiler, gestiona prospectos y compradores cualificados, calendariza visitas presenciales y monitoriza el rendimiento comercial del equipo con métricas de conversión en tiempo real.

---

## ✨ Características Principales

### 🚀 Frontend (React 19 + TypeScript + Tailwind CSS v4)

- **Directorio y Filtros Multicriterio:** Filtrado en tiempo real por tipo de propiedad, rango de precio, habitaciones, ubicación y estado (`Available`, `Sold`, `Rented`, `Pending`).
- **Dashboard Analítico con Recharts:** Métricas de volumen de ventas, tasa de conversión y distribución de visitas comerciales.
- **Formularios con Validación Zod:** Creación y edición de inmuebles mediante React Hook Form y validación tipada.
- **Gestión de Estado Modular con Zustand:** Stores desacoplados para autenticación, catálogo de propiedades y filtros.

### 🛡️ Backend & Datos (Node.js 22 + Express 5 + Sequelize + MySQL 8.4 LTS)

- **Autenticación JWT & BCrypt:** Registro, login y perfil con control de roles (`admin`, `agent`).
- **Modelo Relacional de 4 Entidades:** `agents`, `clients`, `properties` y `appointments` con claves foráneas, restricciones de integridad e índices.
- **API REST Completa:** Endpoints para gestión de cartera, agenda de citas y analíticas.
- **Migraciones SQL Versionadas:** Runner que registra cada migración en `schema_migrations`.

---

## 🏛️ Arquitectura del Proyecto

```text
08-real-estate-crm/
├── server/                        # Backend (Node.js 22 + Express 5 + Sequelize + MySQL)
│   ├── migrations/                # Migraciones SQL versionadas
│   ├── src/                       # Controladores, modelos, rutas, schemas
│   ├── .env.example
│   └── package.json
├── src/                           # Frontend (Vite + React 19 + Tailwind v4)
│   ├── components/                # layout, auth, dashboard, properties, calendar
│   ├── services/api.ts            # Cliente HTTP real (fetch + Bearer)
│   ├── store/                     # Stores Zustand
│   └── App.tsx
├── LICENSE
└── package.json
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos

- Node.js `>= 20.0.0`
- npm `>= 10.0.0`
- MySQL 8.4 LTS (local o en contenedor)

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/alxnrocha/real-estate-crm.git
   cd real-estate-crm
   ```

2. **Instalar dependencias de Frontend y Backend:**

   ```bash
   npm install
   npm install --prefix server
   ```

3. **Configurar variables de entorno:**
   Cree `server/.env` a partir de `server/.env.example`:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=real_estate_crm
   JWT_SECRET=real_estate_secret_key_2026
   ```

4. **Aplicar migraciones y datos de prueba:**

   ```bash
   npm run db:migrate
   npm run seed
   ```

5. **Ejecutar en modo desarrollo:**
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

---

## 🛡️ Calidad de Código & Testing

- **Linter & Tipado:** Oxlint y TypeScript en modo estricto en frontend y backend.
- **Tests Automatizados:** Pruebas unitarias e integración con Supertest y MySQL.

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
