import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validateEnv } from './config/validation';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
      envFilePath: [
        `.env.${process.env.NODE_ENV ?? 'development'}.local`,
        `.env.${process.env.NODE_ENV ?? 'development'}`,
        '.env.local',
        '.env',
      ],
    }),
    DatabaseModule,
    RedisModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
