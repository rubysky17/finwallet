import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { User } from "../users/user.entity";

export enum WalletType {
    BASIC = "basic",
    LINKED = "linked",
    GOAL = "goal",
    CREDIT = "credit",
    OTHER = "other"
}

@Entity("wallets")
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({
        type: 'enum',
        enum: WalletType,
        default: WalletType.BASIC,
    })
    type: WalletType;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => User, (user) => user.wallets, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ length: 10, default: 'USD' })
    currencyFormat: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    currentBalance: number;

    @Column({ default: true })
    enabled: boolean;

    @Column({ default: true })
    allowNotifications: boolean;

    @Column({ default: false })
    archived: boolean;

    @Column({ type: 'json', nullable: true })
    categories: Array<any>;

    @Column({ type: 'json', nullable: true })
    membersInclude: Array<any>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}