import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { UOM } from 'src/enums/uom.enum';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    description: string;

    @IsEnum(UOM)
    uom: UOM;

    qty: number;

    created_by: string;

    updated_by: string;
}