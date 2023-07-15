import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { UOM } from 'src/enums/uom.enum';

export class CreateItemDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    description: string;

    @IsEnum(UOM)
    uom: UOM;

    created_by: string;

    updated_by: string;
}