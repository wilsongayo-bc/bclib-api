import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';
import { CreateProductInDto } from '../models/dto/create-product-in.dto';
import { UpdateProductInDto } from '../models/dto/update-product-in.dto';
import { ProductIn } from '../models/entities/product-in.entity';
import { ProductInService } from '../service/product-in.service';

@Controller('product-in')
@UseGuards(JwtAuthGuard)
export class ProductInController {

  constructor(private readonly productInService: ProductInService) { }

  @Post()
  create(
    @RequestGetUser() user: User,
    @Body() createProductInDto:CreateProductInDto): Promise<ProductIn> 
  {
    return this.productInService.create(createProductInDto, user.username);
  }

  @Get(':filterDate')
  async getAll(@Param('filterDate') filterDate: Date): Promise<ProductIn[]> {
    return this.productInService.getAll(filterDate);
  }

  @Get('/edit/:id')
  async getById(@Param('id') id: number): Promise<ProductIn>{
      return await this.productInService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') productInId: number,
    @Body() updateProductInDto: UpdateProductInDto,
    @RequestGetUser() user: User,
  ): Promise<ProductIn> {
    const updatedProductIn = await this.productInService.update(productInId, updateProductInDto, user.username);
    return updatedProductIn;
  }
}
