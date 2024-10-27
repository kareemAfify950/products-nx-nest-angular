import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ toJSON: { virtuals: true, transform: (doc, ret) => { delete (ret as any).password; return ret; } } })
export class User {
    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true })
    password!: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
