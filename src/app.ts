import express from 'express';
import cors from 'cors';
import Database from './database-simple';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Instance de la base de données (Singleton)
const db = Database.getInstance();

// Routes API
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.getAllTasks();
    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, status, priority } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, error: 'Le titre est requis' });
    }

    const newTask = await db.createTask({ 
      title: title.trim(),
      status: status || 'To Do',
      priority: priority || 'Medium'
    });
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, priority, completed } = req.body;
    
    const updatedTask = await db.updateTask(id, { title, status, priority, completed });
    if (!updatedTask) {
      return res.status(404).json({ success: false, error: 'Tâche non trouvée' });
    }

    res.json({ success: true, data: updatedTask });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await db.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Tâche non trouvée' });
    }

    res.json({ success: true, message: 'Tâche supprimée' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.patch('/api/tasks/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await db.getTaskById(id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Tâche non trouvée' });
    }

    // Basculer entre 'To Do' et 'Done'
    const newStatus = task.status === 'Done' ? 'To Do' : 'Done';
    const updatedTask = await db.updateTask(id, { status: newStatus });
    res.json({ success: true, data: updatedTask });
  } catch (error) {
    console.error('Erreur lors du basculement de la tâche:', error);
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Serveur opérationnel' });
});

// Initialiser la base de données et démarrer le serveur
async function startServer() {
  try {
    await db.initialize();
    
    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📱 Interface: http://localhost:${PORT}`);
      console.log(`🗄️ Base de données PostgreSQL connectée`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

startServer();
