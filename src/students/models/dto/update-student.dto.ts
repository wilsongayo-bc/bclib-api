import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Status } from 'src/enums/status.enum';
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
    s
    full_name: string;

    @IsNotEmptyObject({ nullable: false })
    course: Course

    @IsNotEmpty()
    year_level: string;

    @IsNotEmpty()
    Enrollment_date: Date;
    
    @IsEnum(Status)
    status: Status;

    description: string;

    updated_by: string;
}