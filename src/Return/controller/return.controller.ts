import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ReturnService } from '../service/return';
import { CreateReturnDto } from '../models/dto/create-return.dto';
import { Return } from '../models/entities/return';
import { UpdateReturnDto } from '../models/dto/update-return.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('return')
@UseGuards(JwtAuthGuard)
export class ReturnController {

  constructor(private readonly ReturnService: ReturnService) { }

  @Post()
  createBorrow(
    @RequestGetUser() user: User,
    @Body() CreateReturnDto :CreateReturnDto): Promise<Return> 
  {
    return this.ReturnService.createReturn(CreateReturnDto , user.username);
  }

  @Get()
  async getAllBorrowRecord(): Promise<Return[]> {
      return this.ReturnService.getAllReturn();
  }

  @Get('/:id')
  async getStudentById(@Param('id') id: number): Promise<Return>{
      return await this.ReturnService.findReturnById(id);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') studentId: number,
    @Body() UpdateReturnDto: UpdateReturnDto,
    @RequestGetUser() user: User,
  ): Promise<Return> {
    const updatedReturnRecord = await this.ReturnService.updateReturn(studentId, UpdateReturnDto, user.username);
    return updatedReturnRecord;
  }
}
