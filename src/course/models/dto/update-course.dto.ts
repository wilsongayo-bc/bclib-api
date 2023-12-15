import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { UpdateDateColumn } from 'typeorm';

export class UpdateCourseDto {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    course_name: string;

    @IsEnum(Status)
    status: Status;

    description: string;

    updated_by: string;

    @UpdateDateColumn({ name: 'current_time_update' })
   currentTimeUpdate: Date;
}