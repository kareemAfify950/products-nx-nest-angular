import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@products-space/Schema';
import { JWT_SECERET } from '@products-space/Constants';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_SECERET,
      signOptions: { expiresIn: '8d' },
    }),
  ],
  providers: [AuthService, JwtStrategy,],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy,], // Export for other modules to use
})
export class AuthJwtModule { }
