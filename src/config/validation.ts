import { z } from 'zod';

const rawEnvSchema = z.object({
  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(3306),
  DB_USER: z.string().default('root'),
  DB_PASS: z.string().default(''),
  DB_NAME: z.string().default('test'),

  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASS: z.string().optional().default(''),
});

export function validateEnv(config: Record<string, unknown>) {
  const parsed = rawEnvSchema.safeParse(config);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({ path: i.path, message: i.message, code: i.code }));
    throw new Error(JSON.stringify({ issues }));
  }
  return parsed.data;
}

