import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './controller/role.controller';
import { Role } from './models/entities/role.entity';
import { RoleService } from './service/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Role]
    )
  ],
  controllers: [RolesController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
