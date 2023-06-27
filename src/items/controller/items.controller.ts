import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ItemsService } from '../service/items.service';
import { CreateItemDto } from '../models/dto/create-item.dto';
import { Item } from '../models/entities/item.entity';
import { UpdateItemDto } from '../models/dto/update-item.dto';

@Controller('items')
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  createItem(@Body() createItemDto:CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(createItemDto);
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
  ): Promise<Item> {
    const updatedItem = await this.itemsService.updateItem(itemId, updateItemDto);
    return updatedItem;
  }
}
