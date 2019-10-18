import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, Query, Res, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserLoginDTO } from '../../service/dto/user-login.dto';
import { AuthService } from '../../service/auth.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { resolve } from 'path';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';

@Controller()
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('user-oauth2-controller')
export class UserOauth2Controller {
  logger = new Logger('UserOauth2Controller');

  constructor(private readonly authService: AuthService) { }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/login/oauth2/code/oidc')
  @ApiOperation({ title: 'Microservice redirect' })
  @ApiResponse({
    status: 200,
    description: 'Redirect oauth2 login',
  })
  async redirect(@Req() req: any, @Res() res: any) {
    res.session = req.session;
    res.session.user = req.user;
    const url = req.session.url;
    return res.redirect(url || '/');

  }

  @Get('/oauth2/authorization/oidc')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ title: 'Microservice login auth oidc' })
  @ApiResponse({
    status: 200,
    description: 'Redirect to login oauth2 oidc',
  })
  async loginAuthOidc(@Req() req: Request) {
    return;
  }

  @Post('/api/logout')
  @ApiOperation({ title: 'Microservice logout auth oidc' })
  @ApiResponse({
    status: 201,
    description: 'Logout oauth2 oidc',
  })
  async logoutAuthOidc(@Req() req: any, @Res() res: any) {
    req.session.destroy();
    this.logger.log(' logout sess:' + JSON.stringify(req.session));
    return res.sendStatus(201);
  }

}
