import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../models/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../models/dto/create-student.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { StudentErrors } from 'src/shared/errors/student/student.errors';
import { UpdateStudentDto } from '../models/dto/update-student.dto';

@Injectable()
export class StudentsService {

    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

    async createStudent(createstudentDto:CreateStudentDto, username: string): Promise<Student> {
        createstudentDto.created_by = username;
        createstudentDto.updated_by = username;
        createstudentDto.name = createstudentDto.name.toUpperCase();

        const studentDB = await this.findStudentByName(createstudentDto.name);
        if(studentDB){
            throw new NotFoundException(StudentErrors.Conflict);
        } 

        const student = await this.studentRepository.create(createstudentDto);
        await student.save();

        return student;
    }

    /* get all students */
    async getAllStudents(): Promise<Student[]> {
        try {
           return await this.studentRepository.find({
            select: {
                id: true,
                name: true,
                status: true,
                created_at: true,
                updated_at: true,
                created_by: true,
                updated_by: true
            }
           });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find student by id */
    async findStudentById(id:number): Promise<Student> {
        const student = await this.studentRepository.findOne({where: {id: id}});
        if(!student){
            throw new NotFoundException(StudentErrors.StudentNotFound);
        } 

        try {
            return await student;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updateStudent(
        studentId: number, 
        updateStudentDto: UpdateStudentDto, 
        username: string): Promise<Student> 
    {
        const student = await this.studentRepository.findOne({where: {id: studentId}});
    
        if (!student) {
          throw new NotFoundException(StudentErrors.StudentNotFound);
        }
    
        // Update student fields
        student.name = updateStudentDto.name;
        student.status = updateStudentDto.status;
        student.updated_by = username;
    
        // Save updated student
        await this.studentRepository.save(student);
        return student;
      }

    async findStudentByName(studentName: string) {
        return await Student.findOne({
            where: {
                name: studentName,
            },
        });
    }
}
