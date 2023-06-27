import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';

export class CreateUserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsEnum(Status)
    status: Status;

    created_by: string;
}