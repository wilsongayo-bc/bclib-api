import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class UpdateAccessionDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    code: string;

    @IsEnum(Status)
    status: Status;

    updated_by: string;
}