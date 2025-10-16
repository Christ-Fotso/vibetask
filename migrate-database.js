// Script de migration pour mettre à jour la base de données
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'VibeTask_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'daag'
});

async function migrateDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Début de la migration...');
    
    // 1. Créer les types ENUM
    console.log('📝 Création des types ENUM...');
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE task_status_enum AS ENUM (
          'To Do',
          'In Progress', 
          'On Hold',
          'Done',
          'Canceled'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE task_priority_enum AS ENUM (
          'Low',      -- 0 - Vert
          'Medium',   -- 1 - Orange  
          'High'      -- 2 - Rouge
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    
    // 2. Ajouter les nouvelles colonnes
    console.log('🔧 Ajout des colonnes status et priority...');
    await client.query(`
      ALTER TABLE tasks 
      ADD COLUMN IF NOT EXISTS status task_status_enum DEFAULT 'To Do',
      ADD COLUMN IF NOT EXISTS priority task_priority_enum DEFAULT 'Medium';
    `);
    
    // 3. Migrer les données existantes
    console.log('📊 Migration des données existantes...');
    await client.query(`
      UPDATE tasks 
      SET status = CASE 
          WHEN completed = true THEN 'Done'::task_status_enum
          WHEN completed = false THEN 'To Do'::task_status_enum
      END
      WHERE status IS NULL;
    `);
    
    // 4. Créer les index
    console.log('⚡ Création des index...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
      CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
      CREATE INDEX IF NOT EXISTS idx_tasks_status_priority ON tasks(status, priority);
    `);
    
    // 5. Vérifier la structure
    console.log('✅ Vérification de la structure...');
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'tasks' 
      ORDER BY ordinal_position;
    `);
    
    console.log('\n📋 Structure de la table tasks:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type} (${row.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
    });
    
    // 6. Afficher les données
    const tasks = await client.query(`
      SELECT id, title, status, priority, created_at 
      FROM tasks 
      ORDER BY 
        CASE priority 
          WHEN 'High' THEN 1 
          WHEN 'Medium' THEN 2 
          WHEN 'Low' THEN 3 
        END,
        created_at DESC
      LIMIT 5;
    `);
    
    console.log('\n📝 Exemples de tâches:');
    tasks.rows.forEach(task => {
      console.log(`  - [${task.priority}] ${task.title} (${task.status})`);
    });
    
    console.log('\n🎉 Migration terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrateDatabase().catch(console.error);
