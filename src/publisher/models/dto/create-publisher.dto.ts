import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class CreatePublisherDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    created_by: string;

    updated_by: string;
}