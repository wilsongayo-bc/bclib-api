import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { StudentsService } from '../service/students.service';
import { CreateStudentDto } from '../models/dto/create-student.dto';
import { Student } from '../models/entities/student.entity';
import { UpdateStudentDto } from '../models/dto/update-student.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {

  constructor(private readonly studentsService: StudentsService) { }

  @Post()
  createStudent(
    @RequestGetUser() user: User,
    @Body() createStudentDto:CreateStudentDto): Promise<Student> 
  {
    return this.studentsService.createStudent(createStudentDto, user.username);
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
      return this.studentsService.getAllStudents();
  }
  @Get('/enabled')
  async getAllEnabled(): Promise<Student[]> {
      return this.studentsService.getAllEnabled();
  }

  @Get('/enabled')
  async getAllStudentsEnabled(): Promise<Student[]> {
      return this.studentsService.getAllEnabled();
  }

  @Get('/:id')
  async getStudentById(@Param('id') id: number): Promise<Student>{
      return await this.studentsService.findStudentById(id);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') studentId: number,
    @Body() updateStudentDto: UpdateStudentDto,
    @RequestGetUser() user: User,
  ): Promise<Student> {
    const updatedStudent = await this.studentsService.updateStudent(studentId, updateStudentDto, user.username);
    return updatedStudent;
  }
}
