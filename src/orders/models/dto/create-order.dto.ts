import { PaymentType } from "src/enums/order.enum";

export class CreateOrderDto {
    ordered_to: string;
    
    address: string;

    business_name: string;

    or_number: string;

    payment_type: PaymentType;

    created_by: string;

    updated_by: string;

    created_at: Date;
}