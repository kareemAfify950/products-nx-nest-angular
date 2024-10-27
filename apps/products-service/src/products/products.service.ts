import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '@products-space/Schema';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    async create(productData: Partial<Product>): Promise<Product> {
        const product = new this.productModel(productData);
        return product.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find({ remaining: { $gt: 0 } }).exec();
    }

    async findOne(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    async update(id: string, productData: Partial<Product>): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productData, { new: true }).exec();
    }

    async decrementProductReminaning(productId: string) {
        const product = await this.findOne(productId);
        if (!product) {
            throw new NotFoundError("Not exist");
        }
        const { remaining } = product;
        return this.update(productId, { remaining: remaining - 1 })
    }


    async seed() {
        const products: Partial<Product>[] = [
            {
                name: 'Product 1',
                remaining: 100,
                price: 100
            },
            {
                name: 'Product 2',
                remaining: 296,
                price: 200,
            },
            {
                name: 'Product 3',
                remaining: 77,
                price: 200,
            },
            {
                name: 'Product 4',
                remaining: 212,
                price: 200,
            },
            // Add more products as needed
        ];

        for (const product of products) {
            await this.create(product);
            console.log(`Seeded product: ${product.name}`);
        }
    }

}
