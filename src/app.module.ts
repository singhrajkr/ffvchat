import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { SocketAppGateway } from './socket-app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'jsdeveloper',
      database: 'ffvchatdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CommonModule,
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [AppService, SocketAppGateway],
})
export class AppModule { }
