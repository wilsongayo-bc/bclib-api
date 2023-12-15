import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { UserErrors } from 'src/shared/errors/user/user.errors';
import { UpdateUserDto } from '../models/dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(createUserDto: CreateUserDto, username: string): Promise<User> {
        createUserDto.created_by = username;
        const user = await this.userRepository.create(createUserDto);
        await user.save();

        delete user.password;
        return user;
    }

    /* get all users */
    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find({
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    username: true,
                    email: true,
                    role: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                    created_by: true,
                    updated_by: true
                },
                where: { id: Not(1) }
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find user by id */
    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new NotFoundException(UserErrors.UserNotFound);
        }

        try {
            delete user.password
            // delete user.role
            return user;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }

    }

    async updateUser(
        userId: number,
        updateUserDto: UpdateUserDto,
        username: string): Promise<User> {

        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException(UserErrors.UserNotFound);
        }
        
        // Update user fields
        user.first_name = updateUserDto.first_name;
        user.last_name = updateUserDto.last_name;
        user.role = updateUserDto.role;
        user.status = updateUserDto.status;
        user.updated_by = username;
        user.password = updateUserDto.password;

        // Save updated user
        await this.userRepository.save(user);
        delete user.password
        return user;
    }

    async findUserByEmail(email: string) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

    async findUserByUsername(username: string) {
        return await User.findOne({
            where: {
                username: username,
            },
        });
    }
}