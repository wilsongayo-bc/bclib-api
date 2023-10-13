import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './controller/course.controller';
import { Course } from './models/entities/course.entity';
import { CourseService } from './service/course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Course]
    )
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService]
})
export class CourseModule {}
