import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [RedisCacheModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
