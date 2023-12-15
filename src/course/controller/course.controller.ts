import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { CoursesService } from '../service/course.service';
import { CreateCourseDto } from '../models/dto/create-course.dto';
import { Course } from '../models/entities/course.entity';
import { UpdateCourseDto } from '../models/dto/update-course.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('course')
@UseGuards(JwtAuthGuard)
export class CourseController {

  constructor(private readonly CoursesService: CoursesService) { }

  @Post()
  createCourse(
    @RequestGetUser() user: User,
    @Body() createCourseDto:CreateCourseDto): Promise<Course> 
  {
    return this.CoursesService.createcourse(createCourseDto, user.username);
  }

  @Get()
  async getAllCourse(): Promise<Course[]> {
      return this.CoursesService.getAllcourses();
  }

  @Get('/enabled')
  async getAllEnabled(): Promise<Course[]> {
      return this.CoursesService.getAllEnabled();
  }

  @Get('/:id')
  async getCourseById(@Param('id') id: number): Promise<Course>{
      return await this.CoursesService.findcourseById(id);
  }

  @Put(':id')
  async updateCourse(
    @Param('id') courseId: number,
    @Body() UpdateCourseDto: UpdateCourseDto,
    @RequestGetUser() user: User,
  ): Promise<Course> {
    const updatedCourse = await this.CoursesService.updatecourse(courseId, UpdateCourseDto, user.username);
    return updatedCourse;
  }



  
}
