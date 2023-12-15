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
export class CoursesService {

    constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) { }

    async createcourse(createCourseDto:CreateCourseDto, username: string): Promise<Course> {
        createCourseDto.created_by = username;
        createCourseDto.updated_by = username;
        createCourseDto.course_name = createCourseDto.course_name.toUpperCase();
        
        const courseDB = await this.findcourseByName(createCourseDto.course_name);
        
        if(courseDB){
            throw new ConflictException(CommonErrors.Conflict);
        } 

        const course = await this.courseRepository.create(createCourseDto);
        await course.save();

         return course;
    }

    /* get all courses */
    async getAllcourses(): Promise<Course[]> {
        try {
           return await this.courseRepository.find({
            select: {
                id: true,
                course_name: true,
                code: true,
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
    async findcourseById(id:number): Promise<Course> {
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
    

    async updatecourse(
        courseId: number, 
        updatecourseDto: UpdateCourseDto, 
        username: string): Promise<Course> 
    {
        const course = await this.courseRepository.findOne({where: {id: courseId}});
    
        if (!course) {
          throw new NotFoundException(CourseErrors.CourseNotFound);
        }
    
        // Update course fields
        course.code = updatecourseDto.code;
        course.course_name = updatecourseDto.course_name;
        course.status = updatecourseDto.status;
        course.updated_by = username;
    
        // Save updated course
        await this.courseRepository.save(course);
        return course;
      }

    async findcourseByName(courseName: string) {
        return await Course.findOne({
            where: [
                { course_name: courseName }
            ],
        });
    }
}
