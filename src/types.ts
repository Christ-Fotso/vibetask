// Types pour l'application To-Do List avec statuts avancés et priorités

export type TaskStatus = 'To Do' | 'In Progress' | 'On Hold' | 'Done' | 'Canceled';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: Date;
  updated_at: Date;
  // Garder completed pour la compatibilité (optionnel)
  completed?: boolean;
}

export interface CreateTaskData {
  title: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface UpdateTaskData {
  title?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  // Garder completed pour la compatibilité (optionnel)
  completed?: boolean;
}

// Mapping des priorités vers les couleurs
export const PRIORITY_COLORS = {
  'Low': 'green',      // 0 - Vert
  'Medium': 'orange',  // 1 - Orange
  'High': 'red'        // 2 - Rouge
} as const;

// Mapping des statuts vers les couleurs
export const STATUS_COLORS = {
  'To Do': 'gray',
  'In Progress': 'blue',
  'On Hold': 'yellow',
  'Done': 'green',
  'Canceled': 'red'
} as const;
