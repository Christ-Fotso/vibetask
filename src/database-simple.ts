import { Pool } from 'pg';
import { Task, CreateTaskData, UpdateTaskData } from './types';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Configuration de la base de données depuis les variables d'environnement
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'VibeTask_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'daag'
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
      await this.pool.query('SELECT 1');
      
      this.isInitialized = true;
      console.log('✅ Connexion à VibeTask_db établie avec succès');
    } catch (error) {
      console.error('❌ Erreur de connexion à la base de données:', error);
      throw error;
    }
  }

  public async getAllTasks(): Promise<Task[]> {
    const result = await this.pool.query(`
      SELECT id::text, title, status, priority, created_at, updated_at 
      FROM tasks 
      ORDER BY 
        CASE priority 
          WHEN 'High' THEN 1 
          WHEN 'Medium' THEN 2 
          WHEN 'Low' THEN 3 
        END,
        created_at DESC
    `);
    return result.rows;
  }

  public async getTaskById(id: string): Promise<Task | null> {
    const result = await this.pool.query(`
      SELECT id::text, title, status, priority, created_at, updated_at 
      FROM tasks 
      WHERE id = $1
    `, [id]);
    return result.rows[0] || null;
  }

  public async createTask(data: CreateTaskData): Promise<Task> {
    const result = await this.pool.query(`
      INSERT INTO tasks (title, status, priority) 
      VALUES ($1, $2, $3) 
      RETURNING id::text, title, status, priority, created_at, updated_at
    `, [data.title, data.status || 'To Do', data.priority || 'Medium']);
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
    if (data.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(data.status);
    }
    if (data.priority !== undefined) {
      fields.push(`priority = $${paramIndex++}`);
      values.push(data.priority);
    }
    // Garder la compatibilité avec completed
    if (data.completed !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(data.completed ? 'Done' : 'To Do');
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
      RETURNING id::text, title, status, priority, created_at, updated_at
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
