import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestAuthGuard('oauth2') {
  logger = new Logger('authGuard');


  canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();
    if (request.session.user) {
      request.user = request.session.user;
      return true;
    }

    const url = request.url;

    if (!url.includes('/login/oauth2/code/oidc?code=') && !url.includes('/oauth2/authorization/oidc')) {
      request.session.url = url;
    }

    this.logger.log('url ' + url);

    return super.canActivate(context);
  }
}
