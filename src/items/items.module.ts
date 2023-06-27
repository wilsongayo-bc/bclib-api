import { Module } from '@nestjs/common';
import { ItemsService } from './service/items.service';
import { ItemsController } from './controller/items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './models/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Item]
    )
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
