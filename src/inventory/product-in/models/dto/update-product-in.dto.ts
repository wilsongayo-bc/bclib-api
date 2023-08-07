import { IsEnum, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Product } from 'src/typeorm';

export class UpdateProductInDto {
    @IsNotEmptyObject({ nullable: false })
    product: Product
    
    updated_by: string;

    qty: number;

    description: string;
}