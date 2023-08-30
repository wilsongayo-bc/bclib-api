import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CommonErrors } from 'src/shared/errors/common/common-errors';
import { Order } from '../models/entities/order.entity';
import { CreateOrderDto } from '../models/dto/create-order.dto';
import { OrderErrors } from 'src/shared/errors/order/order.errors';
import { UpdateOrderDto } from '../models/dto/update-order.dto';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) 
        private readonly orderRepository: Repository<Order>,
    ) { }

    async create(createOrderDto:CreateOrderDto, username: string): Promise<Order> {
        createOrderDto.created_by = username;
        createOrderDto.updated_by = username;
        
        const order = await this.orderRepository.create(createOrderDto);
        await order.save();

        return order;
    }

    /* get all product inventory */
    async getAll(filterDate: Date): Promise<Order[]> {
        const today = new Date(filterDate);
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); 

        try {
           return await this.orderRepository.find({
            select: {
                id: true,
                transaction_date: true,
                or_number: true,
                ordered_to: true,
                total_amount: true,
                payment_type: true,
                order_type: true,
                created_at: true,
                updated_at: true,
                created_by: true,
                updated_by: true
            },
            order: { transaction_date: "DESC" },
            where: {
                transaction_date: Between(today, tomorrow),
            },
           });
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
    }

    /* find order by id */
    async findById(id:number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: {id: id},
            relations: {
                details: {
                    product: true
                }
            }
        });

        if(!order){
            throw new NotFoundException(OrderErrors.NotFound);
        } 
        
        try {
            return await order;
        } catch (err) {
            throw new InternalServerErrorException(CommonErrors.ServerError);
        }
        
    }

    async update(
        orderId: number, 
        updateOrderDto: UpdateOrderDto, 
        username: string): Promise<Order> 
    {
        let order = await this.orderRepository.findOne({ 
            where: {id: orderId}
        });
        
        if (!order) {
          throw new NotFoundException(OrderErrors.NotFound);
        }
        
        // Update fields
        // order.product = updateOrderDto.product;
        order.updated_by = username;
        order.ordered_to = updateOrderDto.ordered_to;
        order.address = updateOrderDto.address;
        order.business_name = updateOrderDto.business_name;
        order.or_number = updateOrderDto.or_number;
        order.description = updateOrderDto.description;
        order.payment_type = updateOrderDto.payment_type;
        order.order_type = updateOrderDto.order_type;

        // Save updated 
        await this.orderRepository.save(order);

        return order;
      }

      async updateOrder(orderDB: Order): Promise<Order> {
        orderDB.updated_by = 'system';    
        // Save updated 
        await this.orderRepository.save(orderDB);
        return orderDB;
    }
}

