import { Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, Query, Res, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, Request } from 'express';
import { Authority } from '../../domain/authority.entity';
import { AuthorityRepository } from '../../repository/authority.repository';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { User } from '../../domain/user.entity';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('account-resource')
export class AccountController {
  logger = new Logger('AccountController');

  constructor(private readonly authService: AuthService) { }


  @Get('/authenticate')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ title: 'Check if the user is authenticated' })
  @ApiResponse({
    status: 200,
    description: 'login authenticated'
  })
  async isAuthenticated(@Req() req: Request) {
    const user: User = req['user'];
    return user.login;
  }

  @Get('/account')
  @ApiOperation({ title: 'Get the current user.' })
  @ApiResponse({
    status: 200,
    description: 'user retrieved'
  })
  async getAccount(@Req() req: Request) {
    const user: User = req['user'];
    // this.logger.log('account ' + user);
    // return await this.authService.findUserWithAuthById(user.id);
    if (user) {
      return user;
    }
    return;

  }

  @Post('/account')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ title: 'Update the current user information' })
  @ApiResponse({
    status: 201,
    description: 'user info updated',
    type: User,
  })
  async saveAccount(@Req() req: Request, @Body() user: User, @Res() res: Response) {
    return res.sendStatus(201);
  }

  @Post('/account/change-password')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ title: 'Change current password' })
  @ApiResponse({
    status: 201,
    description: 'user password changed',
    type: User,
  })
  async changePassword(@Req() req: Request, @Body() user: User, @Res() res: Response) {
    return res.sendStatus(201);
  }

  @Post('/account/reset-password/init')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ title: 'Send an email to reset the password of the user' })
  @ApiResponse({
    status: 201,
    description: 'mail to reset password sent',
    type: String,
  })
  async requestPasswordReset(@Req() req: Request, @Body() email: string, @Res() res: Response) {
    return res.sendStatus(201);
  }

  @Post('/account/reset-password/finish')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ title: 'Finish to reset the password of the user' })
  @ApiResponse({
    status: 201,
    description: 'password reset',
    type: String,
  })
  async finishPasswordReset(@Req() req: Request, @Body() keyAndPassword: string, @Res() res: Response) {
    return res.sendStatus(201);
  }


}
