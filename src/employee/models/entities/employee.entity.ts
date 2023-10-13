import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne} from "typeorm";
import { Status } from "src/enums/status.enum";
import { Course } from "src/typeorm";

@Entity()
export class Employee extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    /*
    @Column()
    first_name: string; */
 
    @Column({ unique: true })
    employee_id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    full_name: string;

    @ManyToOne(() => Course, (course) => course)
    course: Course

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
}