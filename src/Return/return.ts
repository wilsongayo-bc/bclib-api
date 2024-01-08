import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnController } from './controller/return.controller';
import { Return } from './models/entities/return';
import { ReturnService } from './service/return';
// import { Return } from './models/entities/return';
// import { Return } from './service/return';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Return]
    )
  ],
  controllers: [ReturnController],
  providers: [ReturnService],
  exports: [ReturnService]
})
export class ReturnModule {}
