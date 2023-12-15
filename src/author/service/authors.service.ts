import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../models/entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from '../models/dto/create-author.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { UpdateAuthorDto } from '../models/dto/update-author.dto';
import { AuthorErrors } from 'src/shared/errors/author/author.errors';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class AuthorsService {

    constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) { }

    async createAuthor(createauthorDto:CreateAuthorDto, username: string): Promise<Author> {
        createauthorDto.created_by = username;
        createauthorDto.updated_by = username;
        createauthorDto.full_name = createauthorDto.full_name.toUpperCase();
        
        const authorDB = await this.findAuthorByName(createauthorDto.full_name);
        
        if(authorDB){
            throw new ConflictException(CommonErrors.Conflict);
        } 

        const author = await this.authorRepository.create(createauthorDto);
        await author.save();

        return author;
    }

    /* get all authors */
    async getAllAuthors(): Promise<Author[]> {
        try {
           return await this.authorRepository.find({
            select: {
                id: true,
                full_name: true,
                status: true,
                number: true,
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

    async getAllEnabled(): Promise<Author[]> {
        try {
            return await this.authorRepository.find({
                where: {
                    status: Status.ENABLED,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find author by id */
    async findAuthorById(id:number): Promise<Author> {
        const author = await this.authorRepository.findOne({where: {id: id}});
        if(!author){
            throw new NotFoundException(AuthorErrors.AuthorNotFound);
        } 

        try {
            return await author;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updateAuthor(
        authorId: number, 
        updateAuthorDto: UpdateAuthorDto, 
        username: string): Promise<Author> 
    {
        const author = await this.authorRepository.findOne({where: {id: authorId}});
    
        if (!author) {
          throw new NotFoundException(AuthorErrors.AuthorNotFound);
        }
    
        // Update author fields
        author.full_name = updateAuthorDto.full_name;
        author.status = updateAuthorDto.status;
        author.number = updateAuthorDto.number;
        author.updated_by = username;
    
        // Save updated author
        await this.authorRepository.save(author);
        return author;
      }

    async findAuthorByName(authorName: string) {
        return await Author.findOne({
            where: [
                { full_name: authorName }
            ],
        });
    }
}
