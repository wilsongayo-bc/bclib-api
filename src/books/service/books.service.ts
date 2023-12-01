import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../models/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../models/dto/create-book.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { BookErrors } from 'src/shared/errors/book/book.errors';
import { UpdateBookDto } from '../models/dto/update-book.dto';
import { BooksStatus, Status } from 'src/enums/status.enum';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async createBook(
    createbookDto: CreateBookDto,
    username: string,
  ): Promise<Book> {
    createbookDto.created_by = username;
    createbookDto.updated_by = username;
    createbookDto.title = createbookDto.title.toUpperCase();
    console.log(createbookDto); // edentify the error
    const bookDB = await this.findBookByNumber(createbookDto.number);
    if (bookDB) {
      throw new NotFoundException(BookErrors.ConflictNumber);
    }

    const book = await this.bookRepository.create(createbookDto);
    await book.save();

    return book;
  }

  /* get all books */
  async getAllBooks(): Promise<Book[]> {
    try {
      return await this.bookRepository.find({
        select: {
          id: true,
          //name: true,
          description: true,
          book_status: true,
          author_number: true,
          classification: true,
          title: true,
          edition: true,
          volumes: true,
          pages: true,
          source_of_fund: true,
          cost_price: true,
          number: true,
          quantity: true,
          year: true,
          remarks: true,
          created_at: true,
          updated_at: true,
          created_by: true,
          updated_by: true,
        },
        relations: ['author', 'category', 'publisher', 'accession'],
      });
    } catch (err) {
      throw new InternalServerErrorException(CommonErrors.ServerError);
    }
  }

  async getAllEnabled(): Promise<Book[]> {
    try {
      return await this.bookRepository.find({
        where: {
          book_status: BooksStatus.AVAILABLE,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(CommonErrors.ServerError);
    }
  }

  /* find book by id */
  async findBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: id },
      relations: ['author', 'category', 'publisher', 'accession'],
    });
    if (!book) {
      throw new NotFoundException(BookErrors.BookNotFound);
    }

    try {
      return await book;
    } catch (err) {
      throw new InternalServerErrorException(CommonErrors.ServerError);
    }
  }

  async updateBook(
    bookId: number,
    updateBookDto: UpdateBookDto,
    username: string,
  ): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException(BookErrors.BookNotFound);
    }

    // Update book fields
    //book.name = updateBookDto.name;
    book.description = updateBookDto.description;
    book.book_status = updateBookDto.book_status;
    book.author = updateBookDto.author;
    book.category = updateBookDto.category;
    book.publisher = updateBookDto.publisher;
    book.accession = updateBookDto.accession;
    book.number = updateBookDto.number;
    book.author_number = updateBookDto.author_number;
    book.classification = updateBookDto.classification;
    book.title = updateBookDto.title;
    book.edition = updateBookDto.edition;
    book.volumes = updateBookDto.volumes;
    book.pages = updateBookDto.pages;
    book.source_of_fund = updateBookDto.source_of_fund;
    book.cost_price = updateBookDto.cost_price;
    book.year = updateBookDto.year;
    book.quantity = updateBookDto.quantity;
    book.remarks = updateBookDto.remarks;
    book.updated_by = username;

    // Save updated book
    await this.bookRepository.save(book);
    return book;
  }

  async findBookByNumber(bookNumber: string) {
    return await Book.findOne({
      where: {
        title: bookNumber,
      },
    });
  }
}
