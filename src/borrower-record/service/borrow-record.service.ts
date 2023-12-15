import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowRecord } from '../models/entities/borrow-record.entity';
import { Repository } from 'typeorm';
import { CreateBorrowRecordDto} from '../models/dto/create-borrow-record.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { StudentErrors } from 'src/shared/errors/student/student.errors';
import { UpdateBorrowRecordDto } from '../models/dto/update-borrow-record.dto';
import { BookErrors } from 'src/shared/errors/book/book.errors';

@Injectable()
export class BorrowRecordService {

    constructor(@InjectRepository(BorrowRecord) private BorrowRecordRepository: Repository<BorrowRecord>) { }

    async createStudent(CreateBorrowRecordDto: CreateBorrowRecordDto, username: string): Promise<BorrowRecord> {
        CreateBorrowRecordDto.created_by = username;
        CreateBorrowRecordDto.updated_by = username;
       /* CreateBorrowRecordDto.fullname = CreateBorrowRecordDto.fullname.toUpperCase(); //name changed to fullname

        const BorrowRecordDB = await this.findBorrowerRecordByName(CreateBorrowRecordDto.fullname); //name changed to fullname

        if (studentDB) {
            throw new NotFoundException(StudentErrors.Conflict);
        } */
        
        const borrow_record = await this.BorrowRecordRepository.create(CreateBorrowRecordDto);
        await borrow_record.save();

        return borrow_record;
    }

    /* get all students */
    async getAllBorrowRecord(): Promise<BorrowRecord[]> {
        try {
            return await this.BorrowRecordRepository.find({
                select: {
                    id: true,
                    //name: true,
                    borrower_type: true,
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

    /*s find student by id */
    async findStudentById(id: number): Promise<BorrowRecord> {
        const BorrowRecord = await this.BorrowRecordRepository.findOne({ where: { id: id },
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

    async updateStudent(
        studentId: number,
        updateBorrowRecordDto: UpdateBorrowRecordDto,
        username: string): Promise<BorrowRecord> {
        const BorrowRecord = await this.BorrowRecordRepository.findOne({ where: { id: studentId } });

        if (!BorrowRecord) {
            throw new NotFoundException(StudentErrors.StudentNotFound);
        }

        // Update student fields
        BorrowRecord.borrower_type = updateBorrowRecordDto.borrower_type;
        BorrowRecord.student = updateBorrowRecordDto.student;
        BorrowRecord.employee = updateBorrowRecordDto.employee;
        BorrowRecord.book = updateBorrowRecordDto.book;
      //  BorrowRecord.date_borrowed = updateBorrowRecordDto.date_borrowed;
        BorrowRecord.date_returned = updateBorrowRecordDto.date_returned;
        BorrowRecord.remarks = updateBorrowRecordDto.remarks;
        BorrowRecord.books_status = updateBorrowRecordDto.books_status;
        BorrowRecord.return_status = updateBorrowRecordDto.return_status;
        BorrowRecord.fee = updateBorrowRecordDto.fee;
        BorrowRecord.updated_by = username;

        // Save updated student
        await this.BorrowRecordRepository.save(BorrowRecord);
        return BorrowRecord;
    }

    async findBorrowerRecordByName(BorrowersRecordName: string) {
        return await BorrowRecord.findOne({
            where: {
              remarks : BorrowersRecordName, 
            },
        });
    }
}
