import { FAKE_TASKS } from "./fake_tasks";

export class Task {

  tasks = FAKE_TASKS;
  constructor(
    public id: number,
    public userId: string,
    public title: string,
    public description: string,
    public completed: boolean,
    public createdAt: Date = new Date(),
    public dueDate?: Date,
    public completedAt?: Date
  ) {}



  userTasks(userId: string) {
    return this.tasks.filter(task => task.userId === userId) as unknown as Task[];
  }
}
