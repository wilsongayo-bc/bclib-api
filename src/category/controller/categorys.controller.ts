import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { CategorysService } from '../service/categorys.service';
import { CreateCategoryDto } from '../models/dto/create-category.dto';
import { Category } from '../models/entities/category.entity';
import { UpdateCategoryDto } from '../models/dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';

@Controller('categorys')
@UseGuards(JwtAuthGuard)
export class CategorysController {

  constructor(private readonly categorysService: CategorysService) { }

  @Post()
  createCategory(
    @RequestGetUser() user: User,
    @Body() createCategoryDto:CreateCategoryDto): Promise<Category> 
  {
    return this.categorysService.createCategory(createCategoryDto, user.username);
  }

  @Get()
  async getAllCategorys(): Promise<Category[]> {
      return this.categorysService.getAllCategorys();
  }

  @Get('/enabled')
  async getAllEnabled(): Promise<Category[]> {
      return this.categorysService.getAllEnabled();
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id: number): Promise<Category>{
      return await this.categorysService.findCategoryById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @RequestGetUser() user: User,
  ): Promise<Category> {
    const updatedCategory = await this.categorysService.updateCategory(categoryId, updateCategoryDto, user.username);
    return updatedCategory;
  }
}
