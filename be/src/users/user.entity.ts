import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { CategoryTemplate } from 'src/categoryTemplate/category-template.entity';
import { Wallet } from 'src/wallets/wallet.entity';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ select: false })
    @Exclude()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
    })
    status: UserStatus;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ nullable: true })
    phoneNumber?: string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({ nullable: true })
    lastLoginAt?: Date;

    @OneToMany(() => CategoryTemplate, (categoryTemplate) => categoryTemplate.user)
    categoryTemplates: CategoryTemplate[];

    @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallets: Wallet[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 12);
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
} 