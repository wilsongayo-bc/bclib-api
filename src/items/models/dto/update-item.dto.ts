import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';
import { UOM } from 'src/enums/uom.enum';

export class UpdateItemDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    description: string;

    @IsEnum(UOM)
    uom: UOM;

    updated_by: string;
}