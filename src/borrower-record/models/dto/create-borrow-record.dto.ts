import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { BookStatus, ReturnStatus, Status, borrower_type } from 'src/enums/status.enum';
import { Book, Course, Employee, Student } from 'src/typeorm';

export class CreateBorrowRecordDto {
    
    @IsEnum(borrower_type)
    borrower_type: borrower_type;
    
    @IsNotEmptyObject({ nullable: false })
    student: Student

    @IsNotEmptyObject({ nullable: false })
    employee: Employee

    @IsNotEmptyObject({ nullable: false })
    book: Book
    /*
    @IsNotEmpty()
    date_borrowed: Date;

    @IsNotEmpty()
    date_returned: Date;

*/
   
    remarks: string;
/*
    @IsNotEmpty()
    Enrollment_date: Date;
  */
    @IsEnum(BookStatus)
    book_status: BookStatus;

    @IsEnum(ReturnStatus)
    return_status: ReturnStatus;

    created_by: string;

    updated_by: string;
}