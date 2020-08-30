import { Controller, CacheKey, UseInterceptors, CacheInterceptor, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(@Inject(RedisCacheService) private redisCacheService: RedisCacheService) { }

    // @CacheKey('AuthMsg')
    // @UseInterceptors(CacheInterceptor)
    @Get()
    getAuth(): string {
        console.log('Hello 1')
        this.redisCacheService.setOrUpdateValInRedisCache('Test1', "Test1 Value", 1000);
        return 'Hello There ! This is Auth Controller.'
    }
}
