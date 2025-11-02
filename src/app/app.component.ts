import { UserService } from './services/user.service';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { FAKE_USERS } from './class/fake_users';
import { User } from './class/user';
import { Title } from '@angular/platform-browser';
import { TaskComponent } from './task/task.component';
import { Task } from './class/task';
import { TaskService } from './services/task.service';
import { FAKE_TASKS } from './class/fake_tasks';

@Component({
  selector: 'app-raiz',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TaskComponent],
  providers: [UserService, TaskService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private taskService: TaskService = inject(TaskService);
  private userService: UserService = inject(UserService);

  title: string = 'Lista de Tareas';
  users: User[] = [];
  user: User | null = null;
  task: Task | null = null;
  tasks: Task[] = [];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.users = this.userService.getUsers() ?? FAKE_USERS;
    this.tasks = this.taskService.getTasks() ?? FAKE_TASKS;
  }

  userSelected(id: string): User {
    return (this.users.find((user) => user.id === id) ||
      new User('No encontrado', '', '', '', '', ''));
  }

  onUserSelect(id: string) {
    this.user = this.userSelected(id);
    this.user.tasks = this.taskService.getTasksByUserId(id);
    console.log('Selected user:', this.user);

  }
}
