import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserModule } from '../module/user.module';
import { PassportModule } from '@nestjs/passport';
import { config } from '../config/config';
import { Oauth2Strategy } from '../security/passport.oauth2.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityRepository } from '../repository/authority.repository';
import { UserOauth2Controller } from '../web/rest/user.oauth2.controller';
import { AuthController } from '../web/rest/auth.controller';
import { AccountController } from '../web/rest/account.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorityRepository]),
    UserModule,
    PassportModule,
  ],
  controllers: [UserOauth2Controller, AuthController, AccountController],
  providers: [AuthService, Oauth2Strategy],
  exports: [AuthService],
})
export class AuthModule { }
