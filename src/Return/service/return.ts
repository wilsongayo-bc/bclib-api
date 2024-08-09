import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Return } from '../models/entities/return';
import { Repository } from 'typeorm';
import { CreateReturnDto} from '../models/dto/create-return.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { StudentErrors } from 'src/shared/errors/student/student.errors';
import { UpdateReturnDto } from '../models/dto/update-return.dto';
import { BookErrors } from 'src/shared/errors/book/book.errors';

@Injectable()
export class ReturnService {

    constructor(@InjectRepository(Return) private ReturnRepository: Repository<Return>) { }

    async createReturn(CreateReturnDto: CreateReturnDto, username: string): Promise<Return> {
        CreateReturnDto.created_by = username;
        CreateReturnDto.updated_by = username;
       /* CreateReturnDto.fullname = CreateReturnDto.fullname.toUpperCase(); //name changed to fullname

        const BorrowRecordDB = await this.findBorrowerRecordByName(CreateReturnDto.fullname); //name changed to fullname

        if (studentDB) {
            throw new NotFoundException(StudentErrors.Conflict);
        } */
        
        const borrow_record = await this.ReturnRepository.create(CreateReturnDto);
        await borrow_record.save();

        return borrow_record;
    }

    /* get all students */
    async getAllReturn(): Promise<Return[]> {
        try {
            return await this.ReturnRepository.find({
                select: {
                    id: true,
                    //name: true,
                   // borrower_type: true,
                    date_borrowed: true,
                    date_returned: true,
                    remarks: true,
                    books_status: true,
                    return_status: true,
                    fee: true,
                    created_at: true,
                    updated_at: true,
                    created_by: true,
                    updated_by: true
                },
            relations: ['student', 'employee','book'],
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /*s find return by id */
    async findReturnById(id: number): Promise<Return> {
        const BorrowRecord = await this.ReturnRepository.findOne({ where: { id: id },
            relations:['student', 'employee', 'book']
        });
        if (!BorrowRecord) {
            throw new NotFoundException(BookErrors.BookNotFound);
        }

        try {
            return await BorrowRecord;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }

    }

    async updateReturn(
        studentId: number,
        UpdateReturnDto: UpdateReturnDto,
        username: string): Promise<Return> {
        const BorrowRecord = await this.ReturnRepository.findOne({ where: { id: studentId } });

        if (!BorrowRecord) {
            throw new NotFoundException(StudentErrors.StudentNotFound);
        }

        // Update student fields
       // BorrowRecord.borrower_type = UpdateReturnDto.borrower_type;
        BorrowRecord.student = UpdateReturnDto.student;
        BorrowRecord.employee = UpdateReturnDto.employee;
        BorrowRecord.book = UpdateReturnDto.book;
      //  BorrowRecord.date_borrowed = UpdateReturnDto.date_borrowed;
        BorrowRecord.date_returned = UpdateReturnDto.date_returned;
        BorrowRecord.remarks = UpdateReturnDto.remarks;
        BorrowRecord.books_status = UpdateReturnDto.books_status;
        BorrowRecord.return_status = UpdateReturnDto.return_status;
        BorrowRecord.fee = UpdateReturnDto.fee;
        BorrowRecord.updated_by = username;

        // Save updated student
        await this.ReturnRepository.save(BorrowRecord);
        return BorrowRecord;
    }

    async findBorrowerRecordByName(BorrowersRecordName: string) {
        return await Return.findOne({
            where: {
              remarks : BorrowersRecordName, 
            },
        });
    }
}
