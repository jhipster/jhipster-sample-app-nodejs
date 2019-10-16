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
@ApiUseTags('user-jwt-controller')
export class UserJWTController {
  logger = new Logger('UserJWTController');

  constructor(private readonly authService: AuthService) { }

  @Get('/login/oauth2/code/oidc')
  @UseGuards(AuthGuard)
  @ApiOperation({ title: 'Microservice redirect' })
  @ApiResponse({
    status: 200,
    description: 'Redirect oauth2 login',
  })
  async redirect(@Req() req: Request, @Res() res: Response) {
    this.logger.log(req['user']);
    return res.redirect('/');
  }


  @UseGuards(AuthGuard)
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
