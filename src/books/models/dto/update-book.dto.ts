import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { BookStatus, BooksStatus, SourceOfFund, Status } from 'src/enums/status.enum';
import { Accession, Author, Category, Publisher } from 'src/typeorm';

export class UpdateBookDto {
   /* @IsNotEmpty()
    name: string; */

    @IsEnum(BooksStatus)
    book_status: BooksStatus;

    @IsNotEmptyObject({ nullable: false })
    author: Author

    @IsNotEmptyObject({ nullable: false })
    category: Category

    @IsNotEmptyObject({ nullable: false })
    publisher: Publisher 

    @IsNotEmptyObject({ nullable: false })
    accession: Accession

    @IsEnum(SourceOfFund)
    source_of_fund: SourceOfFund;

    @IsNotEmpty()
    number: string;

   // author_number: string;

    classification: string;
     
    title: string;
    
    quantity: number;

    edition: string;
    
    volumes: string;

    pages: string;

  //  source_of_fund: string;

    cost_price: number;

    year: number;

    remarks: string; 

    description: string;

    created_by: string;

    updated_by: string; 
}