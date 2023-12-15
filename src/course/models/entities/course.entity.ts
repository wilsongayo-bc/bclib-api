import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Status } from "src/enums/status.enum";

@Entity()
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    code: string;
    
    @Column({ unique: true })
    course_name: string;

    @Column({ type: "enum", enum: Status, default: Status.ENABLED })
    status: Status;

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

    // @UpdateDateColumn({ name: 'current_time_update' })
    // currentTimeUpdate: Date;
}  