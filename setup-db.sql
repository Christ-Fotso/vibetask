-- Script de configuration PostgreSQL pour l'entretien
-- Exécuter ces commandes dans psql ou pgAdmin

-- Créer la base de données si elle n'existe pas
CREATE DATABASE "VibeTask_db";

-- Se connecter à la base
\c "VibeTask_db";

-- Créer les types ENUM
CREATE TYPE task_status_enum AS ENUM (
  'To Do', 'In Progress', 'On Hold', 'Done', 'Canceled'
);

CREATE TYPE task_priority_enum AS ENUM (
  'Low', 'Medium', 'High'
);

-- Créer la table avec les nouveaux champs
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status task_status_enum DEFAULT 'To Do',
    priority task_priority_enum DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Afficher les données
SELECT * FROM tasks;
