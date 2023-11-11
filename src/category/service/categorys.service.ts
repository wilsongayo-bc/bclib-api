import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../models/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../models/dto/create-category.dto';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { UpdateCategoryDto } from '../models/dto/update-category.dto';
import { CategoryErrors } from 'src/shared/errors/category/category.errors';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class CategorysService {

    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async createCategory(createcategoryDto:CreateCategoryDto, username: string): Promise<Category> {
        createcategoryDto.created_by = username;
        createcategoryDto.updated_by = username;
        createcategoryDto.name = createcategoryDto.name.toUpperCase();
        createcategoryDto.code = createcategoryDto.code.toUpperCase();
        
        const categoryDB = await this.findCategoryByNameCode(createcategoryDto.name, createcategoryDto.code);
        
        if(categoryDB){
            throw new ConflictException(CommonErrors.Conflict);
        } 

        const category = await this.categoryRepository.create(createcategoryDto);
        await category.save();

        return category;
    }

    /* get all categorys */
    async getAllCategorys(): Promise<Category[]> {
        try {
           return await this.categoryRepository.find({
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

    async getAllEnabled(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find({
                where: {
                    status: Status.ENABLED,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find category by id */
    async findCategoryById(id:number): Promise<Category> {
        const category = await this.categoryRepository.findOne({where: {id: id}});
        if(!category){
            throw new NotFoundException(CategoryErrors.CategoryNotFound);
        } 

        try {
            return await category;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async updateCategory(
        categoryId: number, 
        updateCategoryDto: UpdateCategoryDto, 
        username: string): Promise<Category> 
    {
        const category = await this.categoryRepository.findOne({where: {id: categoryId}});
    
        if (!category) {
          throw new NotFoundException(CategoryErrors.CategoryNotFound);
        }
    
        // Update category fields
        category.name = updateCategoryDto.name;
        category.code = updateCategoryDto.code;
        category.status = updateCategoryDto.status;
        category.updated_by = username;
    
        // Save updated category
        await this.categoryRepository.save(category);
        return category;
      }

    async findCategoryByNameCode(categoryName: string, code_: string) {
        return await Category.findOne({
            where: [
                { name: categoryName },
                { code: code_ }
            ],
        });
    }
}
