-- Script de configuration PostgreSQL pour l'entretien
-- Exécuter ces commandes dans psql ou pgAdmin

-- Créer la base de données si elle n'existe pas
CREATE DATABASE todolist_db;

-- Se connecter à la base de données
\c todolist_db;

-- Créer la table des tâches
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insérer quelques données d'exemple
INSERT INTO tasks (title, completed) VALUES 
('Préparer la présentation', false),
('Réviser le code TypeScript', true),
('Tester l''API REST', false)
ON CONFLICT DO NOTHING;

-- Afficher les données
SELECT * FROM tasks;
