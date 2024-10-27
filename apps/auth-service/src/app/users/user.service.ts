import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '@products-space/Schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        const newUser = new this.userModel({ email: 'TEST@TEST.COM', password: "123456" });
        await newUser.save();
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }
}
