import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserModule } from '../module/user.module';
import { PassportModule } from '@nestjs/passport';
import { config } from '../config/config';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityRepository } from '../repository/authority.repository';
import { UserJWTController } from '../web/rest/user.jwt.controller';
import { AuthController } from '../web/rest/auth.controller';
import { AccountController } from '../web/rest/account.controller';
// import { SessionSerializer } from '../security/session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorityRepository]),
    UserModule,
    PassportModule,
  ],
  controllers: [UserJWTController, AuthController, AccountController],
  providers: [AuthService, JwtStrategy,
    // SessionSerializer
    ],
  exports: [AuthService],
})
export class AuthModule {}
