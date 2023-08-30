import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class UpdateBankDto {
    @IsNotEmpty()
    name: string;

    description: string;

    @IsEnum(Status)
    status: Status;

    updated_by: string;
}