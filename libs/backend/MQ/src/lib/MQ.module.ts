// libs/rabbitmq/src/lib/rabbitmq.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({})
export class RabbitMQModule {
    static register(options: { queue: string }): DynamicModule {
        return {
            module: RabbitMQModule,
            imports: [
                ClientsModule.register([
                    {
                        name: 'RABBITMQ_SERVICE',
                        transport: Transport.RMQ,
                        options: {
                            urls: ['amqp://localhost:5672'],
                            queue: options.queue,
                            queueOptions: {
                                durable: false,
                            },
                        },
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}
