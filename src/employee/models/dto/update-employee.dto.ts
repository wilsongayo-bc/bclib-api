import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { Course} from 'src/typeorm';

export class UpdateEmployeeDto {
    /*@IsNotEmpty()
    name: string; */
    
    @IsNotEmpty()
    employee_id: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;
s
    full_name: string;

    @IsNotEmptyObject({ nullable: false })
    course: Course

    @IsEnum(Status)
    status: Status;

    description: string;

    updated_by: string;
}