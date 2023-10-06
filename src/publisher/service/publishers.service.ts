import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from '../models/entities/publisher.entity';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from '../models/dto/create-publisher.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { UpdatePublisherDto } from '../models/dto/update-publisher.dto';
import { PublisherErrors } from 'src/shared/errors/publisher/publisher.errors';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class PublishersService {

    constructor(@InjectRepository(Publisher) private publisherRepository: Repository<Publisher>) { }

    async createPublisher(createpublisherDto:CreatePublisherDto, username: string): Promise<Publisher> {
        createpublisherDto.created_by = username;
        createpublisherDto.updated_by = username;
        createpublisherDto.name = createpublisherDto.name.toUpperCase();
        
        const publisherDB = await this.findPublisherByName(createpublisherDto.name);
        
        if(publisherDB){
            throw new ConflictException(CommonErrors.Conflict);
        } 

        const publisher = await this.publisherRepository.create(createpublisherDto);
        await publisher.save();

        return publisher;
    }

    /* get all publishers */
    async getAllPublishers(): Promise<Publisher[]> {
        try {
           return await this.publisherRepository.find({
            select: {
                id: true,
                name: true,
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

    async getAllEnabled(): Promise<Publisher[]> {
        try {
            return await this.publisherRepository.find({
                where: {
                    status: Status.ENABLED,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find publisher by id */
    async findPublisherById(id:number): Promise<Publisher> {
        const publisher = await this.publisherRepository.findOne({where: {id: id}});
        if(!publisher){
            throw new NotFoundException(PublisherErrors.PublisherNotFound);
        } 

        try {
            return await publisher;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updatePublisher(
        publisherId: number, 
        updatePublisherDto: UpdatePublisherDto, 
        username: string): Promise<Publisher> 
    {
        const publisher = await this.publisherRepository.findOne({where: {id: publisherId}});
    
        if (!publisher) {
          throw new NotFoundException(PublisherErrors.PublisherNotFound);
        }
    
        // Update publisher fields
        publisher.name = updatePublisherDto.name;
        publisher.status = updatePublisherDto.status;
        publisher.updated_by = username;
    
        // Save updated publisher
        await this.publisherRepository.save(publisher);
        return publisher;
      }

    async findPublisherByName(publisherName: string) {
        return await Publisher.findOne({
            where: [
                { name: publisherName }
            ],
        });
    }
}
