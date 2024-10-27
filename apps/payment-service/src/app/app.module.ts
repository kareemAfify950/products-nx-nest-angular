import { Module } from '@nestjs/common';
import { DbModule } from '@products-space/db';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transaction.module';

@Module({
  imports: [
    DbModule,
    TransactionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
