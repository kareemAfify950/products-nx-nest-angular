import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '@products-space/Schema';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectModel(Transaction.name) private paymentModel: Model<Transaction>,
        @Inject('RABBITMQ_SERVICE') private readonly cp: ClientProxy, // Adjust to the shared RabbitMQ module

    ) { }

    async createTransaction(userId: string, productId: string): Promise<Transaction> {
        const payment = new this.paymentModel({
            userId,
            productId,
            date: new Date(),
        });
        const t = await payment.save();
        this.cp.emit('PRODUCT_TRANSACTION_CREATED', {
            productId,
            userId,
            date: new Date(),
        });
        return t;
    }

    async getUserTransactions(userId: string): Promise<Transaction[]> {
        return this.paymentModel.find({ userId }).populate('userId')    // Populate User details
            .populate('productId')  // Populate Product details
            .exec();
    }
}
