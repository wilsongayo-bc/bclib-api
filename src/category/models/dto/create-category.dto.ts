import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;
    
    code: string;

    created_by: string;

    updated_by: string;
}