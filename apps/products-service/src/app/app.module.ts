import { Module } from '@nestjs/common';
import { DbModule } from '@products-space/db';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from '../products/product.module';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [
    DbModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly ps: ProductsService) { }

  async onModuleInit() {
    await this.ps.seed();
  }
}
