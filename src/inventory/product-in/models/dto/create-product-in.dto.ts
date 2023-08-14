import { IsEmpty, IsNotEmptyObject } from 'class-validator';
import { Product } from 'src/typeorm';

export class CreateProductInDto {
    @IsNotEmptyObject({ nullable: false })
    product: Product

    qty: number;
    
    created_by: string;

    updated_by: string;

    created_at: Date;

    description: string;
}