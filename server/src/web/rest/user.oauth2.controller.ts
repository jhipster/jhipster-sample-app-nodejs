import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, Query, Res, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from '../../service/auth.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { config } from '../../config/config';

const issuerUri = config.get('jhipster.security.oauth2.client.provider.oidc.issuer-uri');

@Controller()
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('user-oauth2-controller')
export class UserOauth2Controller {
  logger = new Logger('UserOauth2Controller');

  constructor(private readonly authService: AuthService) { }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/login/oauth2/code/oidc')
  @ApiOperation({ title: 'Backend redirect' })
  @ApiResponse({
    status: 200,
    description: 'Redirect oauth2 oidc after login',
  })
  async redirect(@Req() req: any, @Res() res: any) {
    res.session = req.session;
    res.session.user = req.user;
    res.session.idToken = req.idToken;
    const url = req.session.url;
    return res.redirect(url || '/');

  }

  @ApiExcludeEndpoint()
  @Get('/oauth2/authorization/oidc')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ title: 'Perform login oauth2 oidc from client' })
  @ApiResponse({
    status: 200,
    description: 'Redirect to login oauth2 oidc',
  })
  async loginAuthOidc(@Req() req: Request) {
    return;
  }

  @ApiExcludeEndpoint()
  @Post('/api/logout')
  @ApiOperation({ title: 'Perform logout oauth2 oidc from client' })
  @ApiResponse({
    status: 201,
    description: 'Logout oauth2 oidc',
  })
  async logoutAuthOidc(@Req() req: any) {
    let idTokenFromSession;
    if (req.session.user) {
      idTokenFromSession = req.session.user.idToken;
    }
    req.session.destroy();
    return { idToken: idTokenFromSession, logoutUrl: `${issuerUri}/v1/logout` };
  }

}
