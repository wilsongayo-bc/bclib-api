import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne} from "typeorm";
import { BookStatus, ReturnStatus, Status, borrower_type } from "src/enums/status.enum";
import { Book,  Employee, Student } from "src/typeorm";

@Entity()
export class BorrowRecord extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: "enum", enum: borrower_type, default: borrower_type.STUDENT })
    borrower_type: borrower_type;

    @ManyToOne(() => Student, (student_id) => student_id)
    student: Student

    @ManyToOne(() => Employee, (employee_id) => employee_id)
    employee: Employee

    @ManyToOne(() => Book, (book_id) => book_id)
    book: Book

    @Column()
    date_borrowed: Date;

    @Column()
    date_returned: Date;

    @Column()
    remarks:string;

    @Column({ type: "enum", enum: BookStatus, default: BookStatus.CHECKEDOUT})
    book_status: BookStatus;
    
    @Column({ type: "enum", enum: ReturnStatus, default: ReturnStatus.GOOD})
    return_status: ReturnStatus;

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