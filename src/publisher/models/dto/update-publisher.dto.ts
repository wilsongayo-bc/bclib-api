import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class UpdatePublisherDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    description: string;

    updated_by: string;
}