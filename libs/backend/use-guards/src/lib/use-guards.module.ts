import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [AuthGuard, JwtService],
  exports: [AuthGuard, JwtService],
})
export class UseGuardsModule { }
