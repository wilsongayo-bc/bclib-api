import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from '../models/entities/bank.entity';
import { Repository } from 'typeorm';
import { CreateBankDto } from '../models/dto/create-bank.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { BankErrors } from 'src/shared/errors/bank/bank.errors';
import { UpdateBankDto } from '../models/dto/update-bank.dto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class BanksService {

    constructor(@InjectRepository(Bank) private bankRepository: Repository<Bank>) { }

    async createBank(createBankDto:CreateBankDto, username: string): Promise<Bank> {
        createBankDto.created_by = username;
        createBankDto.updated_by = username;
        createBankDto.name = createBankDto.name.toUpperCase();

        const bankDB = await this.findBankByName(createBankDto.name);
        if(bankDB){
            throw new NotFoundException(BankErrors.Conflict);
        } 

        const bank = await this.bankRepository.create(createBankDto);
        await bank.save();

        return bank;
    }

    /* get all banks */
    async getAllBanks(): Promise<Bank[]> {
        try {
           return await this.bankRepository.find({
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                location: true,
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

    async getAllEnabled(): Promise<Bank[]> {
        try {
            return await this.bankRepository.find({
                where: {
                    status: Status.ENABLED,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find bank by id */
    async findBankById(id:number): Promise<Bank> {
        const bank = await this.bankRepository.findOne({where: {id: id}});
        if(!bank){
            throw new NotFoundException(BankErrors.BankNotFound);
        } 

        try {
            return await bank;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updateBank(
        bankId: number, 
        updateBankDto: UpdateBankDto, 
        username: string): Promise<Bank> 
    {
        const bank = await this.bankRepository.findOne({where: {id: bankId}});
    
        if (!bank) {
          throw new NotFoundException(BankErrors.BankNotFound);
        }
    
        // Update bank fields
        bank.name = updateBankDto.name;
        bank.description = updateBankDto.description;
        bank.location = updateBankDto.location;
        bank.status = updateBankDto.status;
        bank.updated_by = username;
    
        // Save updated bank
        await this.bankRepository.save(bank);
        return bank;
      }

    async findBankByName(bankName: string) {
        return await Bank.findOne({
            where: {
                name: bankName,
            },
        });
    }
}
