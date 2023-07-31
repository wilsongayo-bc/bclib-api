import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/service/products.service';
import { Product } from 'src/typeorm';
import { ProductInventoryController } from './controller/product-inventory.controller';
import { ProductInventory } from './models/entities/product-inventory.entity';
import { ProductInventoryService } from './service/product-inventory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ProductInventory, Product]
    ),
  ],
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService, ProductsService],
  exports: [ProductInventoryService]
})
export class ProductInventoryModule {}
