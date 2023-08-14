import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ItemsService } from '../service/items.service';
import { CreateItemDto } from '../models/dto/create-item.dto';
import { Item } from '../models/entities/item.entity';
import { UpdateItemDto } from '../models/dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  createItem(
    @RequestGetUser() user: User,
    @Body() createItemDto:CreateItemDto): Promise<Item> 
  {
    return this.itemsService.createItem(createItemDto, user.username);
  }

  @Get()
  async getAllItems(): Promise<Item[]> {
      return this.itemsService.getAllItems();
  }

  @Get('/:id')
  async getItemById(@Param('id') id: number): Promise<Item>{
      return await this.itemsService.findItemById(id);
  }

  @Put(':id')
  async updateItem(
    @Param('id') itemId: number,
    @Body() updateItemDto: UpdateItemDto,
    @RequestGetUser() user: User,
  ): Promise<Item> {
    const updatedItem = await this.itemsService.updateItem(itemId, updateItemDto, user.username);
    return updatedItem;
  }
}
