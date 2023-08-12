import { IsEmpty, IsNotEmptyObject } from 'class-validator';
import { Product } from 'src/typeorm';

export class UpdateOrderDto {
    @IsNotEmptyObject({ nullable: false })
    product: Product

    ordered_to: string;
    
    address: string;

    business_name: string;

    or_number: string;

    description: string;

    created_by: string;

    updated_by: string;

    created_at: Date;
}