import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthorsService } from '../service/authors.service';
import { CreateAuthorDto } from '../models/dto/create-author.dto';
import { Author } from '../models/entities/author.entity';
import { UpdateAuthorDto } from '../models/dto/update-author.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('authors')
@UseGuards(JwtAuthGuard)
export class AuthorsController {

  constructor(private readonly authorsService: AuthorsService) { }

  @Post()
  createAuthor(
    @RequestGetUser() user: User,
    @Body() createAuthorDto:CreateAuthorDto): Promise<Author> 
  {
    return this.authorsService.createAuthor(createAuthorDto, user.username);
  }

  @Get()
  async getAllAuthors(): Promise<Author[]> {
      return this.authorsService.getAllAuthors();
  }

  @Get('/enabled')
  async getAllEnabled(): Promise<Author[]> {
      return this.authorsService.getAllEnabled();
  }

  @Get('/:id')
  async getAuthorById(@Param('id') id: number): Promise<Author>{
      return await this.authorsService.findAuthorById(id);
  }

  @Put(':id')
  async updateAuthor(
    @Param('id') authorId: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @RequestGetUser() user: User,
  ): Promise<Author> {
    const updatedAuthor = await this.authorsService.updateAuthor(authorId, updateAuthorDto, user.username);
    return updatedAuthor;
  }
}
