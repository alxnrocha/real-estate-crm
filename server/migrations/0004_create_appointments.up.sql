-- Migration 0004: create `appointments` table
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `property_id` BIGINT UNSIGNED NOT NULL,
  `client_id` BIGINT UNSIGNED NOT NULL,
  `agent_id` BIGINT UNSIGNED NOT NULL,
  `scheduled_at` DATETIME NOT NULL,
  `status` ENUM('Scheduled','Completed','Cancelled') NOT NULL DEFAULT 'Scheduled',
  `notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_appointments_property` (`property_id`),
  KEY `idx_appointments_client` (`client_id`),
  KEY `idx_appointments_agent` (`agent_id`),
  KEY `idx_appointments_scheduled` (`scheduled_at`),
  CONSTRAINT `fk_appointments_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_appointments_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_appointments_agent` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;