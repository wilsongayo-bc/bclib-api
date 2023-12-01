import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../models/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../models/dto/create-employee.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { UpdateEmployeeDto } from '../models/dto/update-employee.dto';
import { employeeErrors } from 'src/shared/errors/employee/employee.errors';
import { Status } from 'src/enums/status.enum';


@Injectable()
export class employeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) { }

    async createemployee(createEmployeeDto: CreateEmployeeDto, username: string): Promise<Employee> {
        createEmployeeDto.created_by = username;
        createEmployeeDto.updated_by = username;
        createEmployeeDto.full_name = createEmployeeDto.full_name.toUpperCase(); //name changed to full_name

        const employeeDB = await this.findemployeeByName(createEmployeeDto.full_name); //name changed to full_name

        if (employeeDB) {
            throw new NotFoundException(employeeErrors.Conflict);
        }
        createEmployeeDto.full_name = createEmployeeDto.first_name + ' ' + createEmployeeDto.last_name; // combine last name and first name
        const employee = await this.employeeRepository.create(createEmployeeDto);
        await employee.save();

        return employee;
    }

    /* get all employees */
    async getAllemployee(): Promise<Employee[]> {
        try {
            return await this.employeeRepository.find({
                select: {
                    id: true,
                    //name: true,
                    employee_id: true,
                    first_name: true,
                    last_name: true,
                    full_name: true,
                    status: true,
                    created_at: true,
                    updated_at: true,
                    created_by: true,
                    updated_by: true
                },
            relations: ['course'],
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }


    async getAllEnabled(): Promise<Employee[]> {
        try {
            return await this.employeeRepository.find({
                where: {
                    status: Status.ENABLED,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find employee by id */
    async findemployeeById(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { id: id },
            relations:['course']
        });
        if (!employee) {
            throw new NotFoundException(employeeErrors.employeeNotFound);
        }

        try {
            return await employee;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }

    }

    async updateemployee(
        employeeId: number,
        updateemployeeDto: UpdateEmployeeDto,
        username: string): Promise<Employee> {
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });

        if (!employee) {
            throw new NotFoundException(employeeErrors.employeeNotFound);
        }

        // Update employee fields
        employee.employee_id = updateemployeeDto.employee_id;
        employee.first_name = updateemployeeDto.first_name;
        employee.last_name = updateemployeeDto.last_name;
        employee.course = updateemployeeDto.course;
        employee.full_name = updateemployeeDto.full_name; 
        employee.status = updateemployeeDto.status;

        employee.updated_by = username;

        // Save updated employee
        await this.employeeRepository.save(employee);
        return employee;
    }

    async findemployeeByName(employeeName: string) {
        return await Employee.findOne({
            where: {
                full_name: employeeName, // name changed to fullname 
            },
        });
    }
}
