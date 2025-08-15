import { Module } from "@nestjs/common";
import { WalletController } from "./wallet.controller";

@Module({
    imports: [],
    controllers: [WalletController],
    providers: [],
    exports: []
})
export class WalletModule { } 