import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsNotEmpty()
    username: string;

    // @IsEmail()
    // email: string;

    @IsNotEmpty()
    password: string;
}