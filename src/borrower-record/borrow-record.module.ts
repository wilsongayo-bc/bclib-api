import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecordController } from './controller/borrow-record.controller';
import { BorrowRecord } from './models/entities/borrow-record.entity';
import { BorrowRecordService } from './service/borrow-record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [BorrowRecord]
    )
  ],
  controllers: [BorrowRecordController],
  providers: [BorrowRecordService],
  exports: [BorrowRecordService]
})
export class BorrowRecordModule {}
