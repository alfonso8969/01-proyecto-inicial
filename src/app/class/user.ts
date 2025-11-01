import { Task } from './task';

export class User {
  constructor(
    public id: string,
    public name: string,
    public avatar: string,
    public email: string,
    public phone?: string,
    public address?: string,
    public tasks?: Task[]
  ) {}
}
