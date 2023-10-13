import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../models/entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../models/dto/create-course.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { UpdateCourseDto } from '../models/dto/update-course.dto';
import { CourseErrors } from 'src/shared/errors/course/course.errors';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class CourseService {

    constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) { }

    async createCourse(createcourseDto:CreateCourseDto, username: string): Promise<Course> {
        createcourseDto.created_by = username;
        createcourseDto.updated_by = username;
        createcourseDto.name = createcourseDto.name.toUpperCase();
        
        const courseDB = await this.findCourseByName(createcourseDto.name);
        
        if(courseDB){
            throw new ConflictException(CommonErrors.Conflict);
        } 

        const course = await this.courseRepository.create(createcourseDto);
        await course.save();

        return course;
    }

    /* get all course */
    async getAllCourse(): Promise<Course[]> {
        try {
           return await this.courseRepository.find({
            select: {
                id: true,
                code: true,
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

    async getAllEnabled(): Promise<Course[]> {
        try {
            return await this.courseRepository.find({
                where: {
                    status: Status.ENABLED,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find course by id */
    async findCourseById(id:number): Promise<Course> {
        const course = await this.courseRepository.findOne({where: {id: id}});
        if(!course){
            throw new NotFoundException(CourseErrors.CourseNotFound);
        } 

        try {
            return await course;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updateCourse(
        courseId: number, 
        updateCourseDto: UpdateCourseDto, 
        username: string): Promise<Course> 
    {
        const course = await this.courseRepository.findOne({where: {id: courseId}});
    
        if (!course) {
          throw new NotFoundException(CourseErrors.CourseNotFound);
        }
    
        // Update  fields
        course.code = updateCourseDto.code;
        course.name = updateCourseDto.name;
        course.status = updateCourseDto.status;
        course.updated_by = username;
    
        // Save updated course
        await this.courseRepository.save(course);
        return course;
      }

    async findCourseByName(courseName: string) {
        return await Course.findOne({
            where: [
                { name: courseName }
            ],
        });
    }
}
