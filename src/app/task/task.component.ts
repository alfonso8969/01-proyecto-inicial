import { Component, Input } from '@angular/core';
import { User } from '../class/user';
import { Task } from '../class/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input({ required: true }) user!: User;
  @Input({ required: true }) tasks!: Task[];

  taskCompleted(taskId: number): Task | undefined {
    let task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
    return task;
  }
}
