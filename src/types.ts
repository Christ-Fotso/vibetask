// Types pour l'application To-Do List
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskData {
  title: string;
}

export interface UpdateTaskData {
  title?: string;
  completed?: boolean;
}
