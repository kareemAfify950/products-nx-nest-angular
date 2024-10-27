import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from '@products-space/shared-lib';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@products-space/auth-jwt';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @EventPattern('PRODUCT_TRANSACTION_CREATED') // Wildcard listener
    async handleTransactionCreated(@Payload() data: { productId: string; userId: string; date: Date }) {
        console.log('datadata', data)
        await this.productsService.decrementProductReminaning(data.productId)
    }

    @UseGuards(AuthGuard) // Apply guard here
    @Post()
    create(@Body() productData: ProductDTO) {
        return this.productsService.create(productData);
    }

    @UseGuards(AuthGuard) // Apply guard here
    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @UseGuards(AuthGuard) // Apply guard here
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @UseGuards(AuthGuard) // Apply guard here
    @Put(':id')
    update(@Param('id') id: string, @Body() productData: ProductDTO) {
        return this.productsService.update(id, productData);
    }

}
