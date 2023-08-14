import { IsNotEmptyObject } from "class-validator";
import { Product } from "src/typeorm";

export class UpdateOrderDetailDto {
    @IsNotEmptyObject({ nullable: false })
    product: Product

    qty: number;

    price: number;

    created_by: string;

    updated_by: string;

    created_at: Date;
}