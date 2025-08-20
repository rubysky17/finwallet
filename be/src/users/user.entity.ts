<<<<<<< Updated upstream
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { CategoryTemplate } from 'src/categoryTemplate/category-template.entity';
import { Wallet } from 'src/wallets/wallet.entity';
import { UserWallet } from 'src/userWallet/userWallet.entity';
=======
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from "bcrypt";
>>>>>>> Stashed changes

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
<<<<<<< Updated upstream
    MODERATOR = 'moderator',
}
=======
    MODERATOR = "moderator"
};
>>>>>>> Stashed changes

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
<<<<<<< Updated upstream
    SUSPENDED = 'suspended',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
=======
    SUSPENDED = "suspended"
};

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
=======
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
>>>>>>> Stashed changes
    })
    role: UserRole;

    @Column({
<<<<<<< Updated upstream
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE,
=======
        type: "enum",
        enum: UserStatus,
        default: UserStatus.ACTIVE
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    @OneToMany(() => CategoryTemplate, (categoryTemplate) => categoryTemplate.user)
    categoryTemplates: CategoryTemplate[];

=======
>>>>>>> Stashed changes
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

<<<<<<< Updated upstream
    @OneToMany(() => UserWallet, (userWallet) => userWallet.user)
    userWallets: UserWallet[];

=======
>>>>>>> Stashed changes
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
<<<<<<< Updated upstream
            this.password = await bcrypt.hash(this.password, 12);
=======
            this.password = await bcrypt.hash(this.password, 12)
>>>>>>> Stashed changes
        }
    }

    async validatePassword(password: string): Promise<boolean> {
<<<<<<< Updated upstream
        return bcrypt.compare(password, this.password);
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
} 
=======
        return bcrypt.compare(password, this.password)
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
}
>>>>>>> Stashed changes
