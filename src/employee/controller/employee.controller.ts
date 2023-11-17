import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { employeeService } from '../service/employee.service';
import { CreateEmployeeDto } from '../models/dto/create-employee.dto';
import { Employee } from '../models/entities/employee.entity';
import { UpdateEmployeeDto } from '../models/dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class employeeController {

  constructor(private readonly employeeService: employeeService) { }

  @Post()
  createemployee(
    @RequestGetUser() user: User,
    @Body() createemployeeDto:CreateEmployeeDto): Promise<Employee> 
  {
    return this.employeeService.createemployee(createemployeeDto, user.username);
  }

  @Get()
  async getAllemployee(): Promise<Employee[]> {
      return this.employeeService.getAllemployee();
  }

  @Get('/enabled')
  async getAllEnabled(): Promise<Employee[]> {
      return this.employeeService.getAllEnabled();
  }

  @Get('/:id')
  async getemployeeById(@Param('id') id: number): Promise<Employee>{
      return await this.employeeService.findemployeeById(id);
  }

  @Put(':id')
  async updateemployee(
    @Param('id') employeeId: number,
    @Body() updateemployeeDto: UpdateEmployeeDto,
    @RequestGetUser() user: User,
  ): Promise<Employee> {
    const updatedemployee = await this.employeeService.updateemployee(employeeId, updateemployeeDto, user.username);
    return updatedemployee;
  }
}
