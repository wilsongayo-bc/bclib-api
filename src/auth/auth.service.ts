import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { User } from 'src/users/models/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserErrors } from 'src/shared/errors/user/user.errors';

@Injectable()
export class AuthService {

    constructor(
        private usersService:UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findUserByUsername(username);
        if (!user) {
            throw new NotFoundException(UserErrors.UsernameNotFound);
        }
        if (!(await user.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        delete user.password
        return user;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
    
}
