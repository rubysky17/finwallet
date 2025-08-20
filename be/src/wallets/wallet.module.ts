import { Module } from "@nestjs/common";
import { Wallet } from "./wallet.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { UsersModule } from "src/users/users.module";
import { UserWalletModule } from "src/userWallet/userWallet.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet]),
    ],
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService]
})
export class WalletModule { } 