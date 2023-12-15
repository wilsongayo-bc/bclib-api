import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { UsersRole } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';
import { Role } from 'src/typeorm';

export class UpdateUserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    password: string;
    
    @IsEnum(UsersRole)
    role: UsersRole; 
    /*
    @IsNotEmptyObject({ nullable: false })
    role: Role*/

    @IsEnum(Status)
    status: Status;

    updated_by: string;
}