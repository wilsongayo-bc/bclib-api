import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { Course } from 'src/typeorm';

export class CreateEmployeeDto {
    /*@IsNotEmpty()
    name: string;*/

    @IsNotEmpty()
    employee_id: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    full_name: string;

    @IsNotEmptyObject({ nullable: false })
    course: Course

    @IsEnum(Status)
    status: Status;

    created_by: string;

    updated_by: string;
}