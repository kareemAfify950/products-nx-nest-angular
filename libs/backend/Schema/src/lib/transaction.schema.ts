
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId!: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
    productId!: MongooseSchema.Types.ObjectId;

    @Prop({ required: true, default: Date.now })
    date!: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
