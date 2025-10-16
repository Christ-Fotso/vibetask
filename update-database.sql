-- Script de mise à jour de la base de données VibeTask
-- Ajout des statuts avancés et des priorités

-- 1. Créer le type ENUM pour les statuts
CREATE TYPE task_status_enum AS ENUM (
  'To Do',
  'In Progress', 
  'On Hold',
  'Done',
  'Canceled'
);

-- 2. Créer le type ENUM pour les priorités
CREATE TYPE task_priority_enum AS ENUM (
  'Low',      -- 0 - Vert
  'Medium',   -- 1 - Orange  
  'High'      -- 2 - Rouge
);

-- 3. Ajouter les nouvelles colonnes à la table tasks
ALTER TABLE tasks 
ADD COLUMN status task_status_enum DEFAULT 'To Do',
ADD COLUMN priority task_priority_enum DEFAULT 'Medium';

-- 4. Migrer les données existantes
-- Convertir completed=true vers 'Done' et completed=false vers 'To Do'
UPDATE tasks 
SET status = CASE 
    WHEN completed = true THEN 'Done'::task_status_enum
    WHEN completed = false THEN 'To Do'::task_status_enum
END;

-- 5. Supprimer l'ancienne colonne completed (optionnel)
-- ALTER TABLE tasks DROP COLUMN completed;

-- 6. Ajouter des contraintes et index pour optimiser les performances
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_status_priority ON tasks(status, priority);

-- 7. Vérifier la structure de la table
\d tasks;

-- 8. Afficher les données mises à jour
SELECT id, title, status, priority, created_at, updated_at FROM tasks ORDER BY created_at DESC;
