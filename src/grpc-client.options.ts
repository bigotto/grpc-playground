import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'task',
    protoPath: join(__dirname, './task/task.proto'),
  },
};
