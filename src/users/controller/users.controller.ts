import { Controller, Post, Body, Get, Param, Patch, Put, Req, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { User } from '../models/entities/user.entity';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { RequestWithUser } from '../types';
import { RequestGetUser } from '../decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  createUser(
    @RequestGetUser() user: User,
    @Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto, user.username);
  }

  @Get()
  async getAllUsers(@RequestGetUser() user: User): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
  /*
  @Get('/enabled')
  async getAllEnabled(): Promise<User[]> {
      return this.usersService.getAllEnabled();
  }*/

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @RequestGetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.usersService.updateUser(userId, updateUserDto, user.username);
    return updatedUser;
  }
}