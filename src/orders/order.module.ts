import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInventoryService } from 'src/inventory/product/service/product-inventory.service';
import { ProductsService } from 'src/products/service/products.service';
import { Product, ProductInventory } from 'src/typeorm';
import { OrderDetailController } from './controller/order-detail.controller';
import { OrderController } from './controller/order.controller';
import { OrderDetail } from './models/entities/order-detail.entity';
import { Order } from './models/entities/order.entity';
import { OrderDetailService } from './service/order-detail.service';
import { OrderService } from './service/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Order, OrderDetail, Product, ProductInventory]
    ),
  ],
  controllers: [OrderController, OrderDetailController],
  providers: [
    OrderService, 
    ProductsService, 
    OrderDetailService, 
    ProductInventoryService
  ],
  exports: [OrderService, OrderDetailService]
})
export class OrderModule {}
