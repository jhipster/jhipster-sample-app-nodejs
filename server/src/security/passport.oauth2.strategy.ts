import Strategy = require('passport-oauth2');
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException, Logger, HttpService } from '@nestjs/common';
import { Request } from 'express';
import { config } from '../config/config';
import { AuthService } from '../service/auth.service';

const issuerUri = config.get('jhipster.security.oauth2.client.provider.oidc.issuer-uri');
const clientID = config.get('jhipster.security.oauth2.client.registration.oidc.client-id');
const clientSecret = config.get('jhipster.security.oauth2.client.registration.oidc.client-secret');
const port = config.get('server.port');

@Injectable()
export class Oauth2Strategy extends PassportStrategy(Strategy) {

  logger = new Logger('oauth2');

  constructor(private readonly authService: AuthService, private readonly httpService: HttpService) {

    super({
      authorizationURL: `${issuerUri}/v1/authorize`,
      tokenURL: `${issuerUri}/v1/token`,
      clientID: `${clientID}`,
      clientSecret: `${clientSecret}`,
      callbackURL: `http://localhost:${port}/login/oauth2/code/oidc`,
      scope: 'openid profile',
      state: true,
      pkce: true,
    }, async (accessToken: any, refreshToken: any, params: any, user: any, done: any) => {
      const idToken = params.id_token;
      await this.authService.findUserOrSave(user);
      user.idToken = idToken;
      return done(null, user);
    });
  }

  async userProfile(accessToken: any, done: any) {
    // roles with id http://dev-281272.okta.com/api/v1/users/<id>/roles
    // id in http://dev-281272.okta.com/api/v1/users/me
    return await this.httpService.get(`${issuerUri}/v1/userinfo`, {
      headers: {
        // Include the token in the Authorization header
        Authorization: 'Bearer ' + accessToken,
      },
    }).toPromise().then(res => {
      const profile = res.data;

      const userProfile = {
        login: profile.preferred_username,
        password: '***',
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
        authorities: ['ROLE_ADMIN', 'ROLE_USER'],
      };

      return done(null, userProfile);
    }).catch(e => {
      this.logger.error(e);
      return done(new UnauthorizedException({ message: 'error to retrieve user info from accessToken' }), false);
    });

  }

}
