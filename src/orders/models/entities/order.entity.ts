import { OrderType, PaymentType } from "src/enums/order.enum";
import { ColumnNumericTransformer } from "src/utils/helper";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, AfterLoad, BeforeUpdate, ManyToOne } from "typeorm";
import { OrderDetail } from "./order-detail.entity";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ default : '' })
    ordered_to: string;

    @Column({ default : '' })
    address: string;
    
    @Column({ default : '' })
    business_name: string;

    @Column({ default : '', unique: true })
    or_number: string;

    @Column({ type: "datetime", default: () => "NOW()" })
    transaction_date: Date;

    @Column("decimal", {
        precision: 11, scale: 2, default: 0,
        transformer: new ColumnNumericTransformer(),
    })
    total_amount: number;
    
    @OneToMany(() => OrderDetail, (detail) => detail.order, {
        eager: true,
    })
    details: OrderDetail[];

    @AfterLoad()
    @BeforeUpdate()
    updateTotalAmount() {
        let totalDetailAmount = 0;
        if (this.details != null && this.details.length > 0) {
            for (let index = 0; index < this.details.length; index++) {
              const detail = this.details[index];
              totalDetailAmount += detail.total;
            }
      
            this.total_amount = Math.round(totalDetailAmount * 100) / 100;
        }
    }

    @Column("longtext")
    description: string;

    @Column({ type: "enum", enum: OrderType, default: OrderType.DINEIN })
    order_type: OrderType;

    @Column({ type: "enum", enum: PaymentType, default: PaymentType.CASH })
    payment_type: PaymentType;

    @Column("decimal", {
        precision: 11, scale: 2, default: 0,
        transformer: new ColumnNumericTransformer(),
    })
    total_cash: number;

    @Column()
    credit_card: boolean;

    @Column("decimal", {
        precision: 11, scale: 2, default: 0,
        transformer: new ColumnNumericTransformer(),
    })
    credit_card_amount: number;

    @Column({ default : '' })
    credit_card_bank: string

    @Column({ default : '' })
    credit_card_ref_num: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    created_by: string;

    @Column()
    updated_by: string;

}