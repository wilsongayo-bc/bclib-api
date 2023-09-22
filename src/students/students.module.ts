import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './controller/students.controller';
import { Student } from './models/entities/student.entity';
import { StudentsService } from './service/students.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Student]
    )
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule {}
