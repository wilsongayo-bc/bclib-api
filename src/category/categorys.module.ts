import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorysController } from './controller/categorys.controller';
import { Category } from './models/entities/category.entity';
import { CategorysService } from './service/categorys.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Category]
    )
  ],
  controllers: [CategorysController],
  providers: [CategorysService],
  exports: [CategorysService]
})
export class CategorysModule {}
