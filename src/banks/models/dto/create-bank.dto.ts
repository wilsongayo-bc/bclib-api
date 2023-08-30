import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { UOM } from 'src/enums/uom.enum';

export class CreateBankDto {
    @IsNotEmpty()
    name: string;

    description: string;

    @IsEnum(Status)
    status: Status;

    created_by: string;

    updated_by: string;
}