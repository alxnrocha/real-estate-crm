# Database Schema (DER)

Este documento contiene el Diagrama Entidad-Relación (DER) interactivo del sistema, generado a partir del archivo `schema.sql`.

## Diagrama Entidad-Relación

```mermaid
erDiagram
    AGENTS {
        UUID id PK
        VARCHAR name
        VARCHAR email "UNIQUE"
        VARCHAR phone
        VARCHAR avatar_url
        TIMESTAMP created_at
    }
    
    CLIENTS {
        UUID id PK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email "UNIQUE"
        VARCHAR phone
        VARCHAR status "LEAD, ACTIVE, INACTIVE"
        UUID agent_id FK
        TIMESTAMP created_at
    }
    
    PROPERTIES {
        UUID id PK
        VARCHAR title
        TEXT description
        DECIMAL price
        VARCHAR property_type "HOUSE, APARTMENT, CONDO, COMMERCIAL"
        VARCHAR status "AVAILABLE, PENDING, SOLD"
        INT bedrooms
        INT bathrooms
        DECIMAL square_meters
        VARCHAR address
        VARCHAR city
        VARCHAR state
        VARCHAR zip_code
        UUID agent_id FK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    APPOINTMENTS {
        UUID id PK
        UUID agent_id FK
        UUID client_id FK
        UUID property_id FK
        TIMESTAMP appointment_date
        VARCHAR status "SCHEDULED, COMPLETED, CANCELLED"
        TEXT notes
        TIMESTAMP created_at
    }

    AGENTS ||--o{ CLIENTS : "gestiona"
    AGENTS ||--o{ PROPERTIES : "lista"
    AGENTS ||--o{ APPOINTMENTS : "atiende"
    CLIENTS ||--o{ APPOINTMENTS : "solicita"
    PROPERTIES ||--o{ APPOINTMENTS : "ubicacion de"
```

## Relaciones Principales

- **Agents (Agentes)** pueden tener asignados múltiples **Clients (Clientes)** y ser responsables de múltiples **Properties (Propiedades)**.
- **Appointments (Citas/Visitas)** conectan un Agente, un Cliente y opcionalmente una Propiedad en una fecha y hora específicas.
- Si un agente es eliminado, sus propiedades asignadas también se eliminan (`ON DELETE CASCADE`), al igual que sus citas. Los clientes pasan a tener `agent_id` nulo (`ON DELETE SET NULL`).
