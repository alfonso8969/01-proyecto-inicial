import { inject, Injectable } from "@angular/core";
import { User } from "../class/user";
import { StorageInterface } from "./interface.storage";
import { dbStorage } from "./db.storage";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersKey: string = 'users';
  private storage: StorageInterface = inject(dbStorage);

  constructor() {}

  setAllUsers(users: User[]): void {
    this.storage.setItem(this.usersKey, JSON.stringify(users));
  }

  getUsers(): User[] {
    const users = this.storage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  getUserById(userId: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === userId);
  }

  updateUser(userId: string, updatedUser: User): void {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      this.setAllUsers(users);
    }
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.setAllUsers(users);
  }

  removeUser(userId: string): void {
    const users = this.getUsers().filter(user => user.id !== userId);
    this.setAllUsers(users);
  }
}


