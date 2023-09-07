import { OrderType, PaymentType } from "src/enums/order.enum";
import { Bank } from "src/typeorm";

export class CreateOrderDto {
    ordered_to: string;
    
    address: string;

    business_name: string;

    or_number: string;

    payment_type: PaymentType;

    order_type: OrderType;

    total_cash: number;
    
    credit_card: boolean;

    credit_card_amount: number;

    credit_card_bank: string;

    credit_card_ref_num: string;
    
    created_by: string;

    updated_by: string;

    created_at: Date;
}