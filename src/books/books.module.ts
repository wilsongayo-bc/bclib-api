import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './controller/books.controller';
import { Book } from './models/entities/book.entity';
import { BooksService } from './service/books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Book]
    )
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]
})
export class BooksModule {}
