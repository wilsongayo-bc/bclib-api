import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { UsersRole } from "src/enums/role.enum";
import { Status } from "src/enums/status.enum";
import { Role } from "src/role/models/entities/role.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique:true })
    username: string

    @Column({ unique:true })
    email: string

    @Column()
    password: string;
    
    @Column({ type: "enum", enum: UsersRole, default: UsersRole.STUDENT })
    role: UsersRole;
    /*
    @ManyToOne(() => Role, (role) => role)
    role: Role*/

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

    @Column({ default: 'system'})
    updated_by: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}