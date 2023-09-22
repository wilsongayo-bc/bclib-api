import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class CreateBookDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    description: string;

    created_by: string;

    updated_by: string;
}