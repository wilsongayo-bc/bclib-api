import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { BanksService } from '../service/banks.service';
import { CreateBankDto } from '../models/dto/create-bank.dto';
import { Bank } from '../models/entities/bank.entity';
import { UpdateBankDto } from '../models/dto/update-bank.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('banks')
@UseGuards(JwtAuthGuard)
export class BanksController {

  constructor(private readonly banksService: BanksService) { }

  @Post()
  createBank(
    @RequestGetUser() user: User,
    @Body() createBankDto:CreateBankDto): Promise<Bank> 
  {
    return this.banksService.createBank(createBankDto, user.username);
  }

  @Get()
  async getAllBanks(): Promise<Bank[]> {
      return this.banksService.getAllBanks();
  }

  @Get('/enabled')
  async getAllEnabled(): Promise<Bank[]> {
      return this.banksService.getAllEnabled();
  }

  @Get('/:id')
  async getBankById(@Param('id') id: number): Promise<Bank>{
      return await this.banksService.findBankById(id);
  }

  @Put(':id')
  async updateBank(
    @Param('id') bankId: number,
    @Body() updateBankDto: UpdateBankDto,
    @RequestGetUser() user: User,
  ): Promise<Bank> {
    const updatedBank = await this.banksService.updateBank(bankId, updateBankDto, user.username);
    return updatedBank;
  }
}
