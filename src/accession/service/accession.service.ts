import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accession } from '../models/entities/accession.entity';
import { Repository } from 'typeorm';
import { CreateAccessionDto } from '../models/dto/create-accession.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { UpdateAccessionDto } from '../models/dto/update-acccession.dto';
import { AccessionErrors } from 'src/shared/errors/accession/accession.errors';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class AccessionsService {

    constructor(@InjectRepository(Accession) private accessionRepository: Repository<Accession>) { }

    async createAccession(createaccessionDto:CreateAccessionDto, username: string): Promise<Accession> {
        createaccessionDto.created_by = username;
        createaccessionDto.updated_by = username;
        createaccessionDto.name = createaccessionDto.name.toUpperCase();
        
        const accessionDB = await this.findAccessionByName(createaccessionDto.name);
        
        if(accessionDB){
            throw new ConflictException(CommonErrors.Conflict);
        } 

        const accession = await this.accessionRepository.create(createaccessionDto);
        await accession.save();

        return accession;
    }

    /* get all accessions */
    async getAllAccessions(): Promise<Accession[]> {
        try {
           return await this.accessionRepository.find({
            select: {
                id: true,
                name: true,
                code: true,
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

    async getAllEnabled(): Promise<Accession[]> {
        try {
            return await this.accessionRepository.find({
                where: {
                    status: Status.ENABLED,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find accession by id */
    async findAccessionById(id:number): Promise<Accession> {
        const accession = await this.accessionRepository.findOne({where: {id: id}});
        if(!accession){
            throw new NotFoundException(AccessionErrors.AccessionNotFound);
        } 

        try {
            return await accession;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updateAccession(
        accessionId: number, 
        updateAccessionDto: UpdateAccessionDto, 
        username: string): Promise<Accession> 
    {
        const accession = await this.accessionRepository.findOne({where: {id: accessionId}});
    
        if (!accession) {
          throw new NotFoundException(AccessionErrors.AccessionNotFound);
        }
    
        // Update Accession fields
        accession.name = updateAccessionDto.name;
        accession.code = updateAccessionDto.code;
        accession.status = updateAccessionDto.status;
        accession.updated_by = username;
    
        // Save updated Accession
        await this.accessionRepository.save(accession);
        return accession;
      }

    async findAccessionByName(accessionName: string) {
        return await Accession.findOne({
            where: [
                { name: accessionName }
            ],
        });
    }
}
