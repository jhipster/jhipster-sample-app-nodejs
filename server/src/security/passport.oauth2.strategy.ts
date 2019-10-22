import Strategy = require('passport-oauth2');
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException, Logger, HttpService } from '@nestjs/common';
import { Request } from 'express';
import { config } from '../config/config';
import { AuthService } from '../service/auth.service';

const yourOktaDomain = 'dev-281272.okta.com';
const ClientID = '0oa1ldsfjyrdYMRfO357';
const ClientSecret = 'KXgpyXqvD-Kgc2L77C4uaat8E-kpb0CCx4z56Ayt';

@Injectable()
export class Oauth2Strategy extends PassportStrategy(Strategy) {

  logger = new Logger('oauth2');

  constructor(private readonly authService: AuthService, private readonly httpService: HttpService) {

    super({
      authorizationURL: `https://${yourOktaDomain}/oauth2/default/v1/authorize`,
      tokenURL: `https://${yourOktaDomain}/oauth2/default/v1/token`,
      clientID: `${ClientID}`,
      clientSecret: `${ClientSecret}`,
      callbackURL: 'http://localhost:8081/login/oauth2/code/oidc',
      scope: 'openid profile',
      state: true,
    }, async (accessToken: any, refreshToken: any, params: any, user: any, done: any) => {
      const idToken = params.id_token;
      await this.authService.findUserOrSave(user);
      return done(null, {user, idToken});
    });
  }

  async userProfile(accessToken: any, done: any) {
    // roles with id http://dev-281272.okta.com/api/v1/users/00u1ldqoqzZ5MiCRd357/roles
    // id in http://dev-281272.okta.com/api/v1/users/me
    return await this.httpService.get(`https://${yourOktaDomain}/oauth2/default/v1/userinfo`, {
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
