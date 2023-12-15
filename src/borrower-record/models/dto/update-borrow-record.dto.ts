import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { BookStatus, ReturnStatus, Status, borrower_type } from 'src/enums/status.enum';
import { Book, Employee, Student} from 'src/typeorm';

export class UpdateBorrowRecordDto {
    
    @IsEnum(borrower_type)
    borrower_type: borrower_type;
    
    @IsNotEmptyObject({ nullable: false })
    student: Student

    @IsNotEmptyObject({ nullable: false })
    employee: Employee

    @IsNotEmptyObject({ nullable: false })
    book: Book
    
    @IsNotEmptyObject({ nullable: false })
    date_returned: Date;

   
    remarks: string;

    fee: number;

    @IsEnum(BookStatus)
    books_status: BookStatus;

    @IsEnum(ReturnStatus)
    return_status: ReturnStatus;

    description: string;

    updated_by: string;
}