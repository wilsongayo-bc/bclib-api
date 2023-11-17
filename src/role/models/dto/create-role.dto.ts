import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class CreateRoleDto {
    @IsNotEmpty()
    role: string;
    
    description: string;

    @IsEnum(Status)
    status: Status;

    created_by: string;

    updated_by: string;
}