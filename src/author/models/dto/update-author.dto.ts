import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class UpdateAuthorDto {
    @IsNotEmpty()
    full_name: string;

    number: number;
    
    @IsEnum(Status)
    status: Status;

    description: string;

    updated_by: string;
}