import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller("wallets")
export class WalletController {
    @Get()
    async getWallet() { }
}