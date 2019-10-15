import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy} from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
// import OAuth2Strategy = require('passport-oauth2');
import { Injectable, Inject, UnauthorizedException, Logger } from '@nestjs/common';
import { Payload } from './payload.interface';
import { Request } from 'express';
import { config } from '../config/config';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'oauth2') {

  logger = new Logger('OAUTH');
  constructor(private readonly authService: AuthService) {
    super({
      /*authorizationURL: 'https://github.com/login/oauth/authorize',
      tokenURL: 'https://github.com/login/oauth/access_token',
      clientID: 'ee2237108219b3e6eba3',
      clientSecret: '42ac38e2951283d936306d4f83d287a63d8fb7ce',
      callbackURL: 'auth/redirect',
      */
    });
  }

  async validate(payload: Payload, done: VerifiedCallback) {

    /*const user = this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException({ message: 'user does not exist' }), false);
    }
    */
    const user = {
      login: 'admin',
      password: 'admin',
      firstName: 'Administrator',
      lastName: 'Administrator',
      email: 'admin@localhost.it',
      imageUrl: '',
      activated: true,
      langKey: 'en',
      createdBy: 'system',
      lastModifiedBy: 'system',
      authorities: ['ROLE_ADMIN', 'ROLE_USER']
    }
    this.logger.log('enterrrr');
    return done(null, user);
  }
}
