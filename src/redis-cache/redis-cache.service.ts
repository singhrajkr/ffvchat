import { Injectable, Logger, Inject } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import * as cacheManager from 'cache-manager';

@Injectable()
export class RedisCacheService {
    private redisCache: any;
    private memoryCache: any
    constructor() {
        this.redisCache = cacheManager.caching({
            store: redisStore,
            host: 'localhost', // default value
            port: 6379, // default value
        });

        this.memoryCache = cacheManager.caching({
            store: 'memory',
            max: 100,
            ttl: 60
        });

        this.handleRedisConnectionError(this.redisCache);
    }

    /**
     * Listen for redis connection error event
     */
    handleRedisConnectionError(cacheType: any) {
        const cacheClient = cacheType.store.getClient();
        cacheClient.on('error', (error: any) => {
            Logger.log(`${cacheType} Connection Error Event - `, error)
        })
    }

    async setOrUpdateMemoryCache(key: any, val: any, ttl: number) {
        try {
            this.memoryCache.set(`${key}`, `${val}`)
        } catch (error) {
            throw error;
        }

    }

    async getValFromMemoryCache(key: any, val: any) {
        try {
            this.memoryCache.get(`${key}`)
        } catch (error) {
            throw error;
        }
    }

    async setOrUpdateValInRedisCache(key: any, val: any, ttl: number) {
        try {
            console.log('Key Val', key, val, ttl)
            // this.cacheManager.set(`${key}`, `${val}`, {ttl: ttl})
            this.redisCache.set(`${key}`, `${val}`, {ttl: ttl})
        } catch (error) {
            throw error;
        }
    }

    async getValFromRedisCache(key: any) {
        try {
            this.redisCache.get(`${key}`)
        } catch (error) {
            throw error;
        }
    }

    async flushFromMemoryCache(key: any) {
        try {
            this.memoryCache.del(`${key}`)
        } catch (error) {
            throw error;
        }
    }

    async flushFromRediisCache(key: any) {
        try {
            this.redisCache.del(`${key}`)
        } catch (error) {
            throw error;
        }
    }

}
