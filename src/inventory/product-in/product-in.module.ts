import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/service/products.service';
import { Product, ProductInventory } from 'src/typeorm';
import { ProductInventoryService } from '../product/service/product-inventory.service';
import { ProductInController } from './controller/product-in.controller';
import { ProductIn } from './models/entities/product-in.entity';
import { ProductInService } from './service/product-in.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ProductIn, Product, ProductInventory]
    ),
  ],
  controllers: [ProductInController],
  providers: [ProductInService, ProductsService, ProductInventoryService],
  exports: [ProductInService]
})
export class ProductInModule {}
