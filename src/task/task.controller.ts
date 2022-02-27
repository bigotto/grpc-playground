import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { TaskById } from './interfaces/task-by-id.interface';
import { TaskList } from './interfaces/task-list.interface';
import { Task } from './interfaces/task.interface';

interface TaskService {
  findOne(data: TaskById): Observable<Task>;
  findMany(upstream: Observable<TaskById>): Observable<Task>;
}

@Controller('task')
export class TaskController implements OnModuleInit {
  private readonly items: Task[] = [
    { id: 1, description: 'Ler livro', done: true },
    { id: 2, description: 'Ir na academia', done: false },
  ];
  private taskService: TaskService;

  constructor(@Inject('TASK_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.taskService = this.client.getService<TaskService>('TaskService');
  }

  @GrpcMethod('TaskService')
  findOne(data: TaskById): Task {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcMethod('TaskService')
  findAll(): TaskList {
    return {
      tasklist: this.items,
    };
  }

  @GrpcMethod('TaskService')
  updateStatus(data: TaskById): Task {
    const index = this.items.findIndex(({ id }) => id === data.id);
    this.items[index].done = !this.items[index].done;
    return this.items[index];
  }
}
