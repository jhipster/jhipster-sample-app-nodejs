import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestAuthGuard('oauth2') {
  logger = new Logger('authGuard');

  canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();

    if (request.session.user) {
      request.user = request.session.user;
      this.logger.log('already authenticated');
      return true;
    }

    if (!request.url.includes('/login/oauth2/code/oidc?code=') && !request.url.includes('/oauth2/authorization/oidc')) {
      request.session.url = request.url;
    }
    return super.canActivate(context);
  }
}
