import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { BooksService } from '../service/books.service';
import { CreateBookDto } from '../models/dto/create-book.dto';
import { Book } from '../models/entities/book.entity';
import { UpdateBookDto } from '../models/dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {

  constructor(private readonly booksService: BooksService) { }

  @Post()
  createBook(
    @RequestGetUser() user: User,
    @Body() createBookDto:CreateBookDto): Promise<Book> 
  {
    return this.booksService.createBook(createBookDto, user.username);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
      return this.booksService.getAllBooks();
  }

  @Get('/group-by-name')
  async getAllGroupByName(): Promise<Book[]> {
      return this.booksService.getAllGroupByName();
  }
  
  @Get('/enabled')
  async getAllEnabled(): Promise<Book[]> {
      return this.booksService.getAllEnabled();
  }

  @Get('/:id')
  async getBookById(@Param('id') id: number): Promise<Book>{
      return await this.booksService.findBookById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') bookId: number,
    @Body() updateBookDto: UpdateBookDto,
    @RequestGetUser() user: User,
  ): Promise<Book> {
    const updatedBook = await this.booksService.updateBook(bookId, updateBookDto, user.username);
    return updatedBook;
  }
}
