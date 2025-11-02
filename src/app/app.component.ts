import { UsersService } from './services/users.service';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { FAKE_USERS } from './class/fake_users';
import { User } from './class/user';
import { Title } from '@angular/platform-browser';
import { TasksComponent } from './tasks/tasks.component';
import { Task } from './class/task';
import { TasksService } from './services/tasks.service';
import { FAKE_TASKS } from './class/fake_tasks';

@Component({
  selector: 'app-raiz',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent],
  providers: [UsersService, TasksService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private taskService: TasksService = inject(TasksService);
  private userService: UsersService = inject(UsersService);

  title: string = 'Lista de Tareas';
  users: User[] = [];
  tasks: Task[] = [];
  user: User | null = null;
  task: Task | null = null;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    if (this.userService.getUsers().length == 0) {
      this.userService.setAllUsers(FAKE_USERS);
    }
    this.users = this.userService.getUsers();
    if (this.taskService.getTasks().length == 0) {
      this.taskService.setAllTasks(FAKE_TASKS);
    }
    this.tasks = this.taskService.getTasks();
  }

  userSelected(id: string): User {
    return (this.users.find((user) => user.id === id) ||
      new User('No encontrado', '', '', '', '', ''));
  }

  onUserSelect(id: string) {
    this.user = this.userSelected(id);
    this.user.tasks = this.taskService.getTasksByUserId(id);
    console.log('Selected user:', this.user);
    this.titleService.setTitle(`${this.title} - Tareas de ${this.user.name}`);
  }

}
