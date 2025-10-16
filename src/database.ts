import { Pool, PoolClient } from 'pg';
import { Task, CreateTaskData, UpdateTaskData } from './types';

// Configuration de la base de données
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'todolist_db', // Base de données pour l'entretien
  user: 'postgres',
  password: 'postgres' // Mot de passe par défaut
};

// Singleton pour la connexion à la base de données
class Database {
  private static instance: Database;
  private pool: Pool;
  private isInitialized: boolean = false;

  private constructor() {
    this.pool = new Pool(dbConfig);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Créer la table si elle n'existe pas
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      this.isInitialized = true;
      console.log('✅ Base de données PostgreSQL initialisée');
    } catch (error) {
      console.error('❌ Erreur d\'initialisation de la base de données:', error);
      throw error;
    }
  }

  public async getAllTasks(): Promise<Task[]> {
    const result = await this.pool.query(`
      SELECT id::text, title, completed, created_at, updated_at 
      FROM tasks 
      ORDER BY created_at DESC
    `);
    return result.rows;
  }

  public async getTaskById(id: string): Promise<Task | null> {
    const result = await this.pool.query(`
      SELECT id::text, title, completed, created_at, updated_at 
      FROM tasks 
      WHERE id = $1
    `, [id]);
    return result.rows[0] || null;
  }

  public async createTask(data: CreateTaskData): Promise<Task> {
    const result = await this.pool.query(`
      INSERT INTO tasks (title) 
      VALUES ($1) 
      RETURNING id::text, title, completed, created_at, updated_at
    `, [data.title]);
    return result.rows[0];
  }

  public async updateTask(id: string, data: UpdateTaskData): Promise<Task | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(data.title);
    }
    if (data.completed !== undefined) {
      fields.push(`completed = $${paramIndex++}`);
      values.push(data.completed);
    }

    if (fields.length === 0) {
      return this.getTaskById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await this.pool.query(`
      UPDATE tasks 
      SET ${fields.join(', ')} 
      WHERE id = $${paramIndex} 
      RETURNING id::text, title, completed, created_at, updated_at
    `, values);

    return result.rows[0] || null;
  }

  public async deleteTask(id: string): Promise<boolean> {
    const result = await this.pool.query(`
      DELETE FROM tasks 
      WHERE id = $1
    `, [id]);
    return (result.rowCount || 0) > 0;
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export default Database;
