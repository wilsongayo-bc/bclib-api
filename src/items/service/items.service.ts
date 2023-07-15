import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../models/entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from '../models/dto/create-item.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { ItemErrors } from 'src/shared/errors/item/item.errors';
import { UpdateItemDto } from '../models/dto/update-item.dto';

@Injectable()
export class ItemsService {

    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) { }

    async createItem(createitemDto:CreateItemDto, username: string): Promise<Item> {
        createitemDto.created_by = username;
        createitemDto.updated_by = username;
        createitemDto.name = createitemDto.name.toUpperCase();

        const itemDB = await this.findItemByName(createitemDto.name);
        if(itemDB){
            throw new NotFoundException(ItemErrors.Conflict);
        } 

        const item = await this.itemRepository.create(createitemDto);
        await item.save();

        return item;
    }

    /* get all items */
    async getAllItems(): Promise<Item[]> {
        try {
           return await this.itemRepository.find({
            select: {
                id: true,
                name: true,
                uom: true,
                description: true,
                status: true,
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

    /* find item by id */
    async findItemById(id:number): Promise<Item> {
        const item = await this.itemRepository.findOne({where: {id: id}});
        if(!item){
            throw new NotFoundException(ItemErrors.ItemNotFound);
        } 

        try {
            return await item;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updateItem(
        itemId: number, 
        updateItemDto: UpdateItemDto, 
        username: string): Promise<Item> 
    {
        const item = await this.itemRepository.findOne({where: {id: itemId}});
    
        if (!item) {
          throw new NotFoundException(ItemErrors.ItemNotFound);
        }
    
        // Update item fields
        item.name = updateItemDto.name;
        item.description = updateItemDto.description;
        item.uom = updateItemDto.uom;
        item.status = updateItemDto.status;
        item.updated_by = username;
    
        // Save updated item
        await this.itemRepository.save(item);
        return item;
      }

    async findItemByName(itemName: string) {
        return await Item.findOne({
            where: {
                name: itemName,
            },
        });
    }
}
