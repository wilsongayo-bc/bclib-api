import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../models/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../models/dto/create-student.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { StudentErrors } from 'src/shared/errors/student/student.errors';
import { UpdateStudentDto } from '../models/dto/update-student.dto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class StudentsService {

    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

    async createStudent(createstudentDto: CreateStudentDto, username: string): Promise<Student> {
        createstudentDto.created_by = username;
        createstudentDto.updated_by = username;
        createstudentDto.full_name = createstudentDto.full_name.toUpperCase(); //name changed to full_name
        

         createstudentDto.full_name =  createstudentDto.first_name + ' ' +  createstudentDto.last_name; // combine last name and first name

        const studentDB = await this.findStudentByName(createstudentDto.full_name); //name changed to full_name

        if (studentDB) {
            throw new NotFoundException(StudentErrors.Conflict);
        }
        createstudentDto.full_name = createstudentDto.first_name + ' ' + createstudentDto.last_name;
        createstudentDto.full_name.toUpperCase();
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
                    //name: true,
                    student_id: true,
                    first_name: true,
                    last_name: true,
                    full_name: true,
                    year_level: true,
                    enrollment_date: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                    created_by: true,
                    updated_by: true
                },
            relations: ['course'],
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    async getAllEnabled(): Promise<Student[]> {
        try {
            return await this.studentRepository.find({
                where: {
                    status: Status.ENABLED,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find student by id */
    async findStudentById(id: number): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { id: id },
            relations:['course']
        });
        if (!student) {
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
        username: string): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { id: studentId } });

        if (!student) {
            throw new NotFoundException(StudentErrors.StudentNotFound);
        }

        // Update student fields
        student.student_id = updateStudentDto.student_id;
        student.first_name = updateStudentDto.first_name;
        student.last_name = updateStudentDto.last_name;
        student.full_name = updateStudentDto.full_name; 
        student.year_level = updateStudentDto.year_level;
        student.enrollment_date = updateStudentDto.enrollment_date;
        student.status = updateStudentDto.status;
        student.course = updateStudentDto.course;
        student.updated_by = username;

        // Save updated student
        await this.studentRepository.save(student);
        return student;
    }

    async findStudentByName(studentName: string) {
        return await Student.findOne({
            where: {
                full_name: studentName, // name changed to fullname 
            },
        });
    }
}
