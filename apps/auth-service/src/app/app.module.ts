import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { DbModule } from '@products-space/db';
import { AuthJwtModule } from '@products-space/auth-jwt';

@Module({
  imports: [
    UsersModule,
    DbModule,
    AuthJwtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
