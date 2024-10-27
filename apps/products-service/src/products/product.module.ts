import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_SECERET } from '@products-space/Constants';

import { Product, ProductSchema } from '@products-space/Schema';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UseGuardsModule } from '@products-space/use-guards';
// import { AuthJwtModule } from '@products-space/auth-jwt';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    // AuthJwtModule,
    UseGuardsModule
  ],
  providers: [
    ProductsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule { }
