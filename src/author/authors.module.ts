import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './controller/authors.controller';
import { Author } from './models/entities/author.entity';
import { AuthorsService } from './service/authors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Author]
    )
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
