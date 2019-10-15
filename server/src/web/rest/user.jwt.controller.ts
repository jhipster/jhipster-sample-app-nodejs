import {
  Body,
  HttpStatus,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  Req,
  UseInterceptors,
  HttpService,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserLoginDTO } from '../../service/dto/user-login.dto';
import { AuthService } from '../../service/auth.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { resolve } from 'path';

@Controller()
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('user-jwt-controller')
export class UserJWTController {
  logger = new Logger('UserJWTController');

  constructor(private readonly authService: AuthService, private readonly httpService: HttpService) { }

  @Post('api/authenticate')
  @ApiOperation({ title: 'Authorization api retrieving token' })
  @ApiResponse({
    status: 201,
    description: 'Authorized'
  })
  async authorize(@Req() req: Request, @Body() user: UserLoginDTO) {
    this.logger.log('code:' + req.query.code);
    // this.logger.log(req['access_token']);
    // const jwt = await this.authService.login(user);
    // res.setHeader('Authorization', 'Bearer ' + req['access_token']);
    // return req.res.json({access_token: req['access_token']});
    return;
  }

  @Get('/login/oauth2/code/oidc')
  @ApiOperation({ title: 'Microservice redirect' })
  @ApiResponse({
    status: 200,
    description: 'Redirect oauth2 login',
  })
  async redirect(@Req() req: Request, @Res() res: Response) {
    // this.logger.log('res:' + req.res);
    const requestToken = req.query.code;


    const response = this.httpService.post(`https://github.com/login/oauth/access_token?client_id=ee2237108219b3e6eba3&client_secret=42ac38e2951283d936306d4f83d287a63d8fb7ce&code=${requestToken}`);
    response.subscribe(result => {
      const tes = JSON.stringify(result.data).split('&');
      const values = tes[0].split('=');

      const accessToken = values[1];

      this.logger.log('accessToken:' + accessToken);
      res.setHeader('Authorization', 'Bearer ' + accessToken);
      return res.redirect('/');
    });

  }

  @Get('/oauth2/authorization/oidc')
  @ApiOperation({ title: 'Microservice auth oidc' })
  @ApiResponse({
    status: 200,
    description: 'Redirect oauth2 oidc',
  })
  async authOidc(@Req() req: Request, @Res() res: Response) {
    return res.redirect('https://github.com/login/oauth/authorize?client_id=ee2237108219b3e6eba3');
  }


}
