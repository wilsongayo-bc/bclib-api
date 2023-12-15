import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class CreateAuthorDto {
    @IsNotEmpty()
    full_name: string;
    
    author:number;
    
    @IsEnum(Status)
    status: Status;

    created_by: string;

    updated_by: string;
}