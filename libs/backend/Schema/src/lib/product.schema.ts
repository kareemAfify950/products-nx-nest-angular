import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true })
    remaining!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);