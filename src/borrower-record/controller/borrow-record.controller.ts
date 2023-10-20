import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { BorrowRecordService } from '../service/borrow-record.service';
import { CreateBorrowRecordDto } from '../models/dto/create-borrow-record.dto';
import { BorrowRecord} from '../models/entities/borrow-record.entity';
import { UpdateBorrowRecordDto } from '../models/dto/update-borrow-record.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('borrowers-record')
@UseGuards(JwtAuthGuard)
export class BorrowRecordController {

  constructor(private readonly BorrowRecordService: BorrowRecordService) { }

  @Post()
  createBorrow(
    @RequestGetUser() user: User,
    @Body() CreateBorrowRecordDto :CreateBorrowRecordDto): Promise<BorrowRecord> 
  {
    return this.BorrowRecordService.createStudent(CreateBorrowRecordDto , user.username);
  }

  @Get()
  async getAllBorrowRecord(): Promise<BorrowRecord[]> {
      return this.BorrowRecordService.getAllBorrowRecord();
  }

  @Get('/:id')
  async getStudentById(@Param('id') id: number): Promise<BorrowRecord>{
      return await this.BorrowRecordService.findStudentById(id);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') studentId: number,
    @Body() UpdateBorrowRecordDto: UpdateBorrowRecordDto,
    @RequestGetUser() user: User,
  ): Promise<BorrowRecord> {
    const updatedBorrowRecord = await this.BorrowRecordService.updateStudent(studentId, UpdateBorrowRecordDto, user.username);
    return updatedBorrowRecord;
  }
}
