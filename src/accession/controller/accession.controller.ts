import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AccessionsService } from '../service/accession.service';
import { CreateAccessionDto } from '../models/dto/create-accession.dto';
import { Accession } from '../models/entities/accession.entity';
import { UpdateAccessionDto } from '../models/dto/update-acccession.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('accessions')
@UseGuards(JwtAuthGuard)
export class AccessionsController {

  constructor(private readonly accessionsService: AccessionsService) { }

  @Post()
  createAccession(
    @RequestGetUser() user: User,
    @Body() createAccessionDto:CreateAccessionDto): Promise<Accession> 
  {
    return this.accessionsService.createAccession(createAccessionDto, user.username);
  }

  @Get()
  async getAllAccessions(): Promise<Accession[]> {
      return this.accessionsService.getAllAccessions();
  }

  @Get('/enabled')
  async getAllEnabled(): Promise<Accession[]> {
      return this.accessionsService.getAllEnabled();
  }

  @Get('/:id')
  async getAccessionById(@Param('id') id: number): Promise<Accession>{
      return await this.accessionsService.findAccessionById(id);
  }

  @Put(':id')
  async updateAccession(
    @Param('id') accessionId: number,
    @Body() updateAccessionDto: UpdateAccessionDto,
    @RequestGetUser() user: User,
  ): Promise<Accession> {
    const updatedAccession = await this.accessionsService.updateAccession(accessionId, updateAccessionDto, user.username);
    return updatedAccession;
  }
}
