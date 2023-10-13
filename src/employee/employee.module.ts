import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { employeeController } from './controller/employee.controller';
import { Employee } from './models/entities/employee.entity';
import { employeeService } from './service/employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Employee]
    )
  ],
  controllers: [employeeController],
  providers: [employeeService],
  exports: [employeeService]
})
export class employeeModule {}
