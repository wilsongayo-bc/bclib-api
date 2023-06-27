import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';

export class UpdateItemDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(Status)
    status: Status;

    updated_by: string;
}