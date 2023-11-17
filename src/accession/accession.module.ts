import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessionsController } from './controller/accession.controller';
import { Accession } from './models/entities/accession.entity';
import { AccessionsService } from './service/accession.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Accession]
    )
  ],
  controllers: [AccessionsController],
  providers: [AccessionsService],
  exports: [AccessionsService]
})
export class AccessionModule {}
