-- Real Estate CRM - database schema (theoretical model for project 08)
-- Target: MySQL 8.4 LTS
-- Charset: utf8mb4

CREATE DATABASE IF NOT EXISTS real_estate_crm
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE real_estate_crm;

-- Agents who manage properties and their clients.
CREATE TABLE agents (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(120)    NOT NULL,
  email         VARCHAR(255)    NOT NULL,
  password_hash VARCHAR(255)    NOT NULL, -- stored hash (bcrypt/argon2), never plain text
  role          ENUM('admin','agent') NOT NULL DEFAULT 'agent',
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_agents_email (email)
) ENGINE=InnoDB;

-- Clients (owners / buyers) assigned to an agent.
CREATE TABLE clients (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  agent_id   BIGINT UNSIGNED NOT NULL,
  name       VARCHAR(120)    NOT NULL,
  email      VARCHAR(255)    NOT NULL,
  phone      VARCHAR(30)     NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_clients_email (email),
  KEY idx_clients_agent (agent_id),
  CONSTRAINT fk_clients_agent FOREIGN KEY (agent_id) REFERENCES agents (id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Properties listed by the agency.
CREATE TABLE properties (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  agent_id   BIGINT UNSIGNED NOT NULL,
  client_id  BIGINT UNSIGNED NULL, -- owner; NULL while the property is unassigned
  title      VARCHAR(200)    NOT NULL,
  address    VARCHAR(255)    NOT NULL,
  price      DECIMAL(12,2)   NOT NULL,
  type       ENUM('House','Apartment','Condo','Villa','Land') NOT NULL,
  status     ENUM('Available','Sold','Rented','Pending') NOT NULL DEFAULT 'Available',
  bedrooms   TINYINT UNSIGNED NOT NULL DEFAULT 0,
  bathrooms  TINYINT UNSIGNED NOT NULL DEFAULT 0,
  area       DECIMAL(8,2)    NOT NULL, -- square meters
  image_url  VARCHAR(500)    NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_properties_agent (agent_id),
  KEY idx_properties_client (client_id),
  KEY idx_properties_status (status),
  KEY idx_properties_type (type),
  KEY idx_properties_price (price),
  CONSTRAINT fk_properties_agent FOREIGN KEY (agent_id) REFERENCES agents (id) ON DELETE RESTRICT,
  CONSTRAINT fk_properties_client FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE SET NULL,
  CONSTRAINT chk_properties_price CHECK (price >= 0),
  CONSTRAINT chk_properties_area CHECK (area > 0)
) ENGINE=InnoDB;

-- Appointments / visits scheduled for a property.
CREATE TABLE appointments (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  property_id  BIGINT UNSIGNED NOT NULL,
  client_id    BIGINT UNSIGNED NOT NULL,
  agent_id     BIGINT UNSIGNED NOT NULL,
  scheduled_at DATETIME        NOT NULL,
  status       ENUM('Scheduled','Completed','Cancelled') NOT NULL DEFAULT 'Scheduled',
  notes        TEXT            NULL,
  created_at   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_appointments_property (property_id),
  KEY idx_appointments_client (client_id),
  KEY idx_appointments_agent (agent_id),
  KEY idx_appointments_scheduled (scheduled_at),
  CONSTRAINT fk_appointments_property FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE,
  CONSTRAINT fk_appointments_client FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
  CONSTRAINT fk_appointments_agent FOREIGN KEY (agent_id) REFERENCES agents (id) ON DELETE CASCADE
) ENGINE=InnoDB;
