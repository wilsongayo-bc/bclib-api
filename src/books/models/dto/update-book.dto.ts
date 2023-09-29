import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { Author, Category, Publisher } from 'src/typeorm';

export class UpdateBookDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    @IsNotEmptyObject({ nullable: false })
    author: Author

    @IsNotEmptyObject({ nullable: false })
    category: Category

    @IsNotEmptyObject({ nullable: false })
    publisher: Publisher

    description: string;

    access_book_num: string;

    updated_by: string;
}