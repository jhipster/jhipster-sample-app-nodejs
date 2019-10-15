import {
  Body,
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
  UseInterceptors
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Authority } from '../../domain/authority.entity';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiUseTags, ApiResponse, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('management')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('management-controller')
export class ManagementController {
  logger = new Logger('ManagementController');

  @ApiExcludeEndpoint()
  @Get('/info')
  @ApiOperation({ title: 'Microservice Info' })
  @ApiResponse({
    status: 200,
    description: 'Check if the microservice is up',
  })
  async info(@Req() req: Request) {
     req.res.status(200);
  }
}
