import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class UpdateRoleDto {
    @IsNotEmpty()
    role: string;

    description: string;

    @IsEnum(Status)
    status: Status;

    updated_by: string;
}