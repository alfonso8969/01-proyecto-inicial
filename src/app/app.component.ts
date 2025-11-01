import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { FAKE_USERS } from './class/fake_users';
import { User } from './class/user';
import { Title } from '@angular/platform-browser';
import { TaskComponent } from './task/task.component';
import { Task } from './class/task';

@Component({
  selector: 'app-raiz',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  title: string = 'Lista de Tareas';
  users: User[] = FAKE_USERS;
  user: User | null = null;
  id: string = '';
  task: Task | null = null;
  tasks: Task[] = [];


  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  get userSelected(): User {
    return (this.users.find((user) => user.id === this.id) ||
      new User('No encontrado', '', '', '', '', ''));
  }

  onUserSelect(id: string) {
    console.log('User selected with ID:', id);
    this.id = id;
    this.user = this.userSelected;
    console.log('Selected user:', this.user);
    this.task = new Task(0, '', '', '', false);
    this.tasks = this.task.userTasks(this.user.id);
    this.user.tasks = this.tasks;
    console.log('Tasks for user', this.user.id, ':', this.user.tasks);
  }
}
