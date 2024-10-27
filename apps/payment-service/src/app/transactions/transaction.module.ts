import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@products-space/MQ';
import { UseGuardsModule } from '@products-space/use-guards';

import { Transaction, TransactionSchema, User, UserSchema, Product, ProductSchema } from '@products-space/Schema';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }, { name: User.name, schema: UserSchema }, { name: Product.name, schema: ProductSchema }]),
    RabbitMQModule.register({ queue: 'products' }),
    UseGuardsModule

  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule { }
