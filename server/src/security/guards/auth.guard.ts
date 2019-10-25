import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  logger = new Logger('authGuard');

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
