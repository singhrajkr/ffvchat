import { Module, CacheModule } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: 6379,
    ttl: 60 * 60, // seconds
    max: 100, // maximum number of items in cache
  })],
  providers: [RedisCacheService],
  exports: [CacheModule, RedisCacheService]
})
export class RedisCacheModule { }
