import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { TaskController } from './task.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [TaskController],
})
export class TaskModule {}
