import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Firefly-萤火小程序 API接口文档')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 设置 Swagger 文档的访问路径为 /docs
  //docs-json 和 docs-yaml 可以访问到原始的 OpenAPI 文档
  SwaggerModule.setup('docs', app, document);
  //测试输出环境变量
  const cfg = app.get(ConfigService);
  const envInfo = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    appPort: cfg.get<number>('app.port'),
    database: {
      host: cfg.get<string>('database.host'),
      port: cfg.get<number>('database.port'),
      username: cfg.get<string>('database.username'),
      name: cfg.get<string>('database.name'),
    },
    redis: {
      enabled: cfg.get<boolean>('redis.enabled'),
      host: cfg.get<string>('redis.host'),
      port: cfg.get<number>('redis.port'),
    },
  };
  // eslint-disable-next-line no-console
  console.log('Environment:', envInfo);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
