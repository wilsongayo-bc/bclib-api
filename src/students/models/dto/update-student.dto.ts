import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Status, YearLevel } from 'src/enums/status.enum';
import { Course } from 'src/typeorm';

export class UpdateStudentDto {
    /*@IsNotEmpty()
    name: string; */

    @IsNotEmpty()
    student_id: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;
  
    full_name: string;

    @IsNotEmptyObject({ nullable: false })
    course: Course

    @IsEnum(YearLevel)
    year_level: YearLevel;

    enrollment_date: Date;
    
    @IsEnum(Status)
    status: Status;

    description: string;

    updated_by: string;
}