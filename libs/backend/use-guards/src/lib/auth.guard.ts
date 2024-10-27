// libs/backend/src/auth/auth.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { JWT_SECERET } from '@products-space/Constants';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {

    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new ForbiddenException('Authorization header missing');
        }

        const token = authHeader.split(' ')[1];
        try {
            const payload = this.jwtService.verify(token, { secret: JWT_SECERET });
            (request as any).user = payload; // Attach user info to request
            return true;
        } catch (error) {
            console.log(error)
            throw new ForbiddenException('Invalid token');
        }
    }
}
