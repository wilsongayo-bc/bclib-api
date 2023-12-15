import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne } from "typeorm";
import { BookStatus, BooksStatus, SourceOfFund, Status } from "src/enums/status.enum";
import { Author, Category, Publisher, Accession } from "src/typeorm";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

   /* @Column()
    name: string; */ 

    @Column()
    description: string;

    @Column({ type: "enum", enum: BooksStatus, default: BooksStatus.AVAILABLE })
    book_status: BooksStatus;

    @ManyToOne(() => Author, (author) => author)
    author: Author

    @ManyToOne(() => Category, (category) => category)
    category: Category

    @ManyToOne(() => Publisher, (publisher) => publisher)
    publisher: Publisher 
    
    @ManyToOne(() => Accession, (accession) => accession)
    accession: Accession
    
    @Column({ unique: true })
    number: string;
    /*
    @Column()
    author_number: string;
    */
    @Column()
    quantity: number;
    
    @Column()
    classification: string; 
    
    @Column()
    title: string;
     
    @Column()
    edition: string;
   
    @Column()
    volumes: string;

    @Column()
    pages: string;

   // @Column()
   // source_of_fund: string;
   @Column({ type: "enum", enum: SourceOfFund, default: SourceOfFund.SCHOOLFUND })
   source_of_fund: SourceOfFund;
  
    @Column()
    cost_price: number;

    @Column()
    year: number;

    @Column()
    remarks: string; 

    @Column()
    created_by: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    updated_by: string;
}