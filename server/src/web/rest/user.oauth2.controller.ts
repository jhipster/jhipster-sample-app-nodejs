import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, Query, Res, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserLoginDTO } from '../../service/dto/user-login.dto';
import { AuthService } from '../../service/auth.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { resolve } from 'path';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';

@Controller()
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@ApiUseTags('user-oauth2-controller')
export class UserOauth2Controller {
  logger = new Logger('UserOauth2Controller');

  constructor(private readonly authService: AuthService) { }

  @Get('/login/oauth2/code/oidc')
  @ApiOperation({ title: 'Microservice redirect' })
  @ApiResponse({
    status: 200,
    description: 'Redirect oauth2 login',
  })
  async redirect(@Req() req: Request, @Res() res: Response) {
    res['session'] = req['session'];
    res['session']['user'] = req['user'];
    return res.redirect('/');

  }

  @Get('/oauth2/authorization/oidc')
  @ApiOperation({ title: 'Microservice auth oidc' })
  @ApiResponse({
    status: 200,
    description: 'Redirect oauth2 oidc',
  })
  async authOidc(@Req() req: Request, @Res() res: Response) {
    // return res.redirect('/');

  }

}
