import { Module, HttpModule} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserModule } from '../module/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config/config';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityRepository } from '../repository/authority.repository';
import { UserJWTController } from '../web/rest/user.jwt.controller';
import { AuthController } from '../web/rest/auth.controller';
import { AccountController } from '../web/rest/account.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorityRepository]),
    UserModule,
    PassportModule,
    HttpModule,
    JwtModule.register({
      secret: config['jhipster.security.authentication.jwt.base64-secret'],
      signOptions: { expiresIn: '300s' }
    })
  ],
  controllers: [UserJWTController, AuthController, AccountController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
