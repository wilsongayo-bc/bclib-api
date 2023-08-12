import { Controller, Post, Body, Get, Param, Put, UseGuards, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderDetail, User } from 'src/typeorm';
import { RequestGetUser } from 'src/users/decorator/user.decorator';
import { CreateOrderDetailDto } from '../models/dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from '../models/dto/update-order-detail.dto';
import { OrderDetailService } from '../service/order-detail.service';

@Controller('order-details')
@UseGuards(JwtAuthGuard)
export class OrderDetailController {

  constructor(private readonly orderDetailService: OrderDetailService) { }

  @Post()
  create(
    @RequestGetUser() user: User,
    @Body() createOrderDetailDto:CreateOrderDetailDto): Promise<OrderDetail> 
  {
    return this.orderDetailService.create(createOrderDetailDto, user.username);
  }

  @Get(':filterDate')
  async getAll(@Param('filterDate') filterDate: Date): Promise<OrderDetail[]> {
    return this.orderDetailService.getAll(filterDate);
  }

  @Get('/edit/:id')
  async getById(@Param('id') id: number): Promise<OrderDetail>{
    return await this.orderDetailService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') orderId: number,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
    @RequestGetUser() user: User,
  ): Promise<OrderDetail> {
    const updatedOrderDetail = await this.orderDetailService.update(orderId, updateOrderDetailDto, user.username);
    return updatedOrderDetail;
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.orderDetailService.delete(id);
  }
}
