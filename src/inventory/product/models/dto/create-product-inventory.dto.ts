import { IsEmpty, IsNotEmptyObject } from 'class-validator';
import { Product } from 'src/typeorm';

export class CreateProductInventoryDto {
    @IsNotEmptyObject({ nullable: false })
    product: Product

    balance_begin: number;
    
    balance_end: number;

    created_by: string;

    updated_by: string;

    created_at: Date;
}