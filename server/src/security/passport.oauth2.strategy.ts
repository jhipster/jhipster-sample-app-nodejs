import Strategy = require('passport-oauth2');
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException, Logger } from '@nestjs/common';
import { Payload } from './payload.interface';
import { Request } from 'express';
import { config } from '../config/config';
import { AuthService } from '../service/auth.service';

const yourOktaDomain = 'dev-281272.okta.com';
const ClientID = '0oa1ldsfjyrdYMRfO357';
const ClientSecret = 'KXgpyXqvD-Kgc2L77C4uaat8E-kpb0CCx4z56Ayt';

@Injectable()
export class Oauth2Strategy extends PassportStrategy(Strategy, 'oauth2') {

  logger = new Logger('oauth2');

  constructor(private readonly authService: AuthService) {

    super({
      authorizationURL: `https://${yourOktaDomain}/oauth2/default/v1/authorize`,
      tokenURL: `https://${yourOktaDomain}/oauth2/default/v1/token`,
      // userInfoURL: `https://${yourOktaDomain}/oauth2/default/v1/userinfo`,
      clientID: `${ClientID}`,
      clientSecret: `${ClientSecret}`,
      callbackURL: 'http://localhost:8081/login/oauth2/code/oidc',
      scope: 'openid profile',
      state: true,
    });
  }

  async validate(accessToken: any, refreshToken: any, profile: any, done: any) {

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
      authorities: ['ROLE_ADMIN', 'ROLE_USER'],
    }


    this.logger.log('profile ' + JSON.stringify(profile));

    return done(null, user);
  }

  async userProfile(accessToken: any, done: any) {
    this.logger.log('accessToken ' + accessToken);
    done(null, { profile: 'empty' });
  }

}
