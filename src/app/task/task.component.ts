import { TasksService } from '../services/tasks.service';
import { Component, inject, Input } from '@angular/core';
import { Task } from '../class/task';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  tasksService: TasksService = inject(TasksService);
  @Input({ required: true }) task?: Task;

  findTask(taskId: number): Task {
    return this.tasksService.getTasks().find((task) => task.id === taskId)!;
  }

  taskCompleted(taskId: number | undefined): Task | undefined {
    let task = this.findTask(taskId!);
    if (task) {
      task.completed = !task.completed;
    }
    task.completedAt = task.completed ? new Date() : undefined;
    this.tasksService.updateTask(task.id, task);
    return task;
  }

  deleteTask(taskId: number | undefined) {
    let task = this.findTask(taskId!);
    if (task) {
      this.tasksService.removeTask(task.id);
    }
  }

  editTask(taskId: number | undefined) {
    let task = this.findTask(taskId!);
    if (task) {
      // Implement edit logic here
    }
  }
}
