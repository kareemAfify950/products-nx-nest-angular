import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '@products-space/Schema';
import { AuthGuard } from '@products-space/auth-jwt';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() user: User) {
        return { ok: true };
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    
    @UseGuards(AuthGuard)
    @Get('me')
    async getCurrentUser(@Req() req): Promise<User> {
        return req.user;
    }
}
