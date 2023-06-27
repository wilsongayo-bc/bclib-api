import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class CreateItemDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    created_by: string;
}