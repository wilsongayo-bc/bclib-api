import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../models/entities/role.entity';
import { Not, Repository } from 'typeorm';
import { CreateRoleDto } from '../models/dto/create-role.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { UpdateRoleDto } from '../models/dto/update-role.dto';
import { Status } from 'src/enums/status.enum';
import { RoleErrors } from 'src/shared/errors/role/role.errors';

@Injectable()
export class RoleService {

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

    async createRole(CreateRoleDto:CreateRoleDto, username: string): Promise<Role> {
        CreateRoleDto.created_by = username;
        CreateRoleDto.updated_by = username;
        CreateRoleDto.role = CreateRoleDto.role.toUpperCase();
        
        const roleDB = await this.findRoleByName(CreateRoleDto.role);
        
        if(roleDB){
            throw new ConflictException(CommonErrors.Conflict);
        } 

        const role = await this.roleRepository.create(CreateRoleDto);
        await role.save();

        return role;
    }

    /* get all role */
    async getAllRoles(): Promise<Role[]> {
        try {
           return await this.roleRepository.find({
            select: {
                id: true,
                role: true,
                description: true,
                status: true,
                created_at: true,
                updated_at: true,
                created_by: true,
                updated_by: true
            }
           });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    async getAllEnabled(): Promise<Role[]> {
        try {
            return await this.roleRepository.find({
                where: {
                    status: Status.ENABLED,
                    role: Not('ADMIN')
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find role by id */
    async findRoleById(id:number): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {id: id}});
        if(!role){
            throw new NotFoundException(RoleErrors.RoleNotFound);
        } 

        try {
            return await role;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updateRole(
        roleId: number, 
        UpdateRoleDto: UpdateRoleDto, 
        username: string): Promise<Role> 
    {
        const role = await this.roleRepository.findOne({where: {id: roleId}});
    
        if (!role) {
          throw new NotFoundException(RoleErrors.RoleNotFound);
        }
    
        // Update Role fields
        role.role = UpdateRoleDto.role;
        role.description = UpdateRoleDto.description;
        role.status = UpdateRoleDto.status;
        role.updated_by = username;
    
        // Save updated Role
        await this.roleRepository.save(role);
        return role;
      }

    async findRoleByName(roleName: string) {
        return await Role.findOne({
            where: [
                { role: roleName }
            ],
        });
    }
}
