import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';

export class UpdateUserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsEnum(Status)
    status: Status;

    updated_by: string;
}