import { Component, inject, Input } from '@angular/core';
import { User } from '../class/user';
import { Task } from '../class/task';
import { TasksService } from '../services/tasks.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private taskService: TasksService = inject(TasksService);

  @Input({ required: true }) user?: User;
  @Input({ required: true }) tasks?: Task[];


  addTask(arg0: string|undefined) {
    throw new Error('Method not implemented.');
  }


}
