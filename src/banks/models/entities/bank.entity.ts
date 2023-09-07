import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Status } from "src/enums/status.enum";

@Entity()
export class Bank extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: Status, default: Status.ENABLED })
    status: Status;

    @Column()
    location: string;

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