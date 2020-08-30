import { Controller, Get, CacheKey, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AppBaseUrl')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @CacheKey('welcomeMsg')
  @UseInterceptors(CacheInterceptor)
  @Get()
  getHello(): string {
    console.log('Hello 1')
    return this.appService.getHello();
  }
}
