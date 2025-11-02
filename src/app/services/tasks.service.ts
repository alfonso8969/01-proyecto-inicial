import { inject, Injectable } from "@angular/core";
import { Task } from "../class/task";
import { StorageInterface } from "./interface.storage";
import { dbStorage } from "./db.storage";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksKey: string = 'tasks';
  private storage: StorageInterface = inject(dbStorage);
  constructor() {}

  setAllTasks(tasks: Task[]): void {
    this.storage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  getTasks(): Task[] {
    const tasks = this.storage.getItem(this.tasksKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  getTaskById(taskId: number): Task | undefined {
    return this.getTasks().find(task => task.id === taskId);
  }

  updateTask(taskId: number, updatedTask: Task): void {
    const taskIndex = this.getTasks().findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.getTasks()[taskIndex] = updatedTask;
      this.setAllTasks(this.getTasks());
    }
  }

  getTasksByUserId(userId: string): Task[] {
    return this.getTasks().filter(task => task.userId === userId);
  }

  addTask(task: Task): void {
    this.getTasks().push(task);
    this.setAllTasks(this.getTasks());
  }

  removeTask(taskId: number): void {
    this.setAllTasks(this.getTasks().filter(task => task.id !== taskId));
  }
}
