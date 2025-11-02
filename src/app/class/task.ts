export class Task {

  constructor(
    public id: number,
    public userId: string,
    public title: string,
    public description: string,
    public completed: boolean,
    public createdAt: Date = new Date(),
    public dueDate?: Date,
    public completedAt?: Date | null
  ) {}

}
