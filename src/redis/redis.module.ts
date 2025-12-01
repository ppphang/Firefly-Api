import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>('REDIS_HOST', '127.0.0.1');
        const port = config.get<number>('REDIS_PORT', 6379);
        const password = config.get<string>('REDIS_PASS') ?? undefined;
        return new Redis({ host, port, password, lazyConnect: true, maxRetriesPerRequest: 0 });
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}

