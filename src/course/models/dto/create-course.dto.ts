import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class CreateCourseDto {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    course_name: string;

    @IsEnum(Status)
    status: Status;
    
    description: string;
    created_by: string;

    updated_by: string;
}