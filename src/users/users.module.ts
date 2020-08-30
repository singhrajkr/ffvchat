import { Module, CacheModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entity/user.entity';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisCacheModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
