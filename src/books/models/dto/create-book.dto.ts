import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { Author, Category, Publisher } from 'src/typeorm';

export class CreateBookDto {
  /*  @IsNotEmpty()
    name: string; */

    @IsEnum(Status)
    status: Status;

    description: string;

    @IsNotEmptyObject({ nullable: false })
    author: Author

    @IsNotEmptyObject({ nullable: false })
    category: Category

    @IsNotEmptyObject({ nullable: false })
    publisher: Publisher

    access_book_num: string;

    author_number:string;
    
    classification:string;
     
    title: string;

    edition: string;
    
    volumes: string;

    pages: string;

    source_of_fund: string;

    cost_price: number;

    year: string;

    remarks: string; 

    created_by: string;

    updated_by: string; 
}