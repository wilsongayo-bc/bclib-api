import { Module } from '@nestjs/common';
import { BanksService } from './service/banks.service';
import { BanksController } from './controller/banks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './models/entities/bank.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Bank]
    )
  ],
  controllers: [BanksController],
  providers: [BanksService],
  exports: [BanksService]
})
export class BanksModule {}
