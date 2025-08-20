import { Module } from '@nestjs/common';
<<<<<<< Updated upstream
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { WalletModule } from 'src/wallets/wallet.module';
import { UserWalletModule } from 'src/userWallet/userWallet.module';
import { CategoryTemplateModule } from 'src/categoryTemplate/category-template.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        WalletModule,
        UserWalletModule,
        CategoryTemplateModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { } 
=======
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
>>>>>>> Stashed changes
