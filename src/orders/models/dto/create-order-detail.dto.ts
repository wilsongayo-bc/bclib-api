import { IsNotEmptyObject } from "class-validator";
import { Product } from "src/typeorm";

export class CreateOrderDetailDto {
    @IsNotEmptyObject({ nullable: false })
    product: Product

    qty: number;

    price: number;

    orderId: number;

    created_by: string;

    updated_by: string;

    created_at: Date;
}