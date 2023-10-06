import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PublishersService } from '../service/publishers.service';
import { CreatePublisherDto } from '../models/dto/create-publisher.dto';
import { Publisher } from '../models/entities/publisher.entity';
import { UpdatePublisherDto } from '../models/dto/update-publisher.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('publishers')
@UseGuards(JwtAuthGuard)
export class PublishersController {

  constructor(private readonly publishersService: PublishersService) { }

  @Post()
  createPublisher(
    @RequestGetUser() user: User,
    @Body() createPublisherDto:CreatePublisherDto): Promise<Publisher> 
  {
    return this.publishersService.createPublisher(createPublisherDto, user.username);
  }

  @Get()
  async getAllPublishers(): Promise<Publisher[]> {
      return this.publishersService.getAllPublishers();
  }

  @Get('/enabled')
  async getAllEnabled(): Promise<Publisher[]> {
      return this.publishersService.getAllEnabled();
  }

  @Get('/:id')
  async getPublisherById(@Param('id') id: number): Promise<Publisher>{
      return await this.publishersService.findPublisherById(id);
  }

  @Put(':id')
  async updatePublisher(
    @Param('id') publisherId: number,
    @Body() updatePublisherDto: UpdatePublisherDto,
    @RequestGetUser() user: User,
  ): Promise<Publisher> {
    const updatedPublisher = await this.publishersService.updatePublisher(publisherId, updatePublisherDto, user.username);
    return updatedPublisher;
  }
}
