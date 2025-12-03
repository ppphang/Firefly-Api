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
        const enabled = config.get<boolean>('redis.enabled', false);
        if (!enabled) {
          return {
            get: async () => null,
            set: async () => 'OK',
            del: async () => 0,
            connect: async () => {},
            disconnect: () => {},
          } as any;
        }
        const host = config.get<string>('redis.host', '127.0.0.1');
        const port = config.get<number>('redis.port', 6379);
        const password = config.get<string>('redis.password') ?? undefined;
        return new Redis({
          host,
          port,
          password,
          lazyConnect: true,
          maxRetriesPerRequest: 0,
          enableReadyCheck: false,
          retryStrategy: () => null,
        });
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}

