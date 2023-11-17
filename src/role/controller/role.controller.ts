import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { CreateRoleDto } from '../models/dto/create-role.dto';
import { Role } from '../models/entities/role.entity';
import { UpdateRoleDto } from '../models/dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {

  constructor(private readonly roleService: RoleService) { }

  @Post()
  createRole(
    @RequestGetUser() user: User,
    @Body() CreateRoleDto:CreateRoleDto): Promise<Role> 
  {
    return this.roleService.createRole(CreateRoleDto, user.username);
  }

  @Get()
  async getAllRole(): Promise<Role[]> {
      return this.roleService.getAllRoles();
  }

  @Get('/enabled')
  async getAllEnabled(): Promise<Role[]> {
      return this.roleService.getAllEnabled();
  }

  @Get('/:id')
  async getRoleById(@Param('id') id: number): Promise<Role>{
      return await this.roleService.findRoleById(id);
  }

  @Put(':id')
  async updateRole(
    @Param('id') roleId: number,
    @Body() UpdateRoleDto: UpdateRoleDto,
    @RequestGetUser() user: User,
  ): Promise<Role> {
    const updatedRole = await this.roleService.updateRole(roleId, UpdateRoleDto, user.username);
    return updatedRole;
  }
}
