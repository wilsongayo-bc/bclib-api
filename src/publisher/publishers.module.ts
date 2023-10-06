import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishersController } from './controller/publishers.controller';
import { Publisher } from './models/entities/publisher.entity';
import { PublishersService } from './service/publishers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Publisher]
    )
  ],
  controllers: [PublishersController],
  providers: [PublishersService],
  exports: [PublishersService]
})
export class PublishersModule {}
