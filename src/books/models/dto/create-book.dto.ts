import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { BookStatus, BooksStatus, SourceOfFund, Status } from 'src/enums/status.enum';
import { Accession, Author, Category, Publisher } from 'src/typeorm';

export class CreateBookDto {
  /*  @IsNotEmpty()
    name: string; */

    @IsEnum(BooksStatus)
    book_status: BooksStatus;

   
    @IsEnum(SourceOfFund)
    source_of_fund: SourceOfFund;

    @IsNotEmptyObject({ nullable: false })
    author: Author

    @IsNotEmptyObject({ nullable: false })
    category: Category
/*
    @IsNotEmptyObject({ nullable: false })
    publisher: Publisher */

    @IsNotEmptyObject({ nullable: false })
    accession: Accession

    @IsNotEmpty()
    number: string;
    
    //author_number:string;
    
    description: string;
    
    classification:string;
     
    title: string;

    quantity: number;

    edition: string;
    
    volumes: string;

    pages: string;

    //source_of_fund: string;

    cost_price: number;


    remarks: string; 

    created_by: string;

    updated_by: string; 
}