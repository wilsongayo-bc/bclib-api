import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne} from "typeorm";
import { Status, YearLevel } from "src/enums/status.enum";
import { Course } from "src/typeorm";

@Entity()
export class Student extends BaseEntity {
    toUpperCase(): Student {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    /*
    @Column()
    first_name: string; */
 
    @Column({ unique: true })
    student_id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    full_name: string;

    @ManyToOne(() => Course, (course) => course)
    course: Course

    @Column({ type: "enum", enum: YearLevel, default: YearLevel.FIRSTYEAR })
    year_level: YearLevel;

    @Column() 
    enrollment_date: Date;

    @Column({ type: "enum", enum: Status, default: Status.ENABLED })
    status: Status;
    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    @UpdateDateColumn()
    created_at: Date;

    @Column()
    created_by: string;

    @Column()
    updated_by: string;
}