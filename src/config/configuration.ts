import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(3306),
  DB_USER: z.string().default('root'),
  DB_PASS: z.string().default(''),
  DB_NAME: z.string().default('test'),

  REDIS_ENABLED: z.coerce.boolean().default(false),
  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASS: z.string().optional().default(''),
});

export type AppConfig = z.infer<typeof envSchema>;

export const configuration = () => {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({ path: i.path, message: i.message, code: i.code }));
    throw new Error(JSON.stringify({ issues }));
  }
  const env = parsed.data;
  return {
    app: {
      port: env.PORT,
    },
    database: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASS,
      name: env.DB_NAME,
    },
    redis: {
      enabled: env.REDIS_ENABLED,
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASS || undefined,
    },
  };
};

