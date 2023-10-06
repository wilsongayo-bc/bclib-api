import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne } from "typeorm";
import { Status } from "src/enums/status.enum";
import { Author, Category, Publisher } from "src/typeorm";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: Status, default: Status.ENABLED })
    status: Status;

    @ManyToOne(() => Author, (author) => author)
    author: Author

    @ManyToOne(() => Category, (category) => category)
    category: Category

    @ManyToOne(() => Publisher, (publisher) => publisher)
    publisher: Publisher
    
    // Accession Book No
    @Column()
    access_book_num: string;

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