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
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('account-resource')
export class AccountController {
  logger = new Logger('AccountController');

  constructor(private readonly authService: AuthService) { }

  @Get('/account')
  @ApiOperation({ title: 'Get the current user if logged' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved',
  })
  async getAccount(@Req() req: any) {
    const user: User = req.session.user;
    if (user) {
      return user;
    }
    return;

  }

}
