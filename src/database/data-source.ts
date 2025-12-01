import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { z } from 'zod';
import { User } from '../users/user.entity';

const env = z.object({
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(3306),
  DB_USER: z.string().default('root'),
  DB_PASS: z.string().default(''),
  DB_NAME: z.string().default('test'),
}).parse(process.env);

export default new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [User],
  migrations: ['src/database/migrations/*.{ts,js}'],
  synchronize: false,
  logging: true,
});
const nodeEnv = process.env.NODE_ENV ?? 'development';
const envFiles = [
  `.env.${nodeEnv}.local`,
  `.env.${nodeEnv}`,
  '.env.local',
  '.env',
];
for (const f of envFiles) {
  dotenv.config({ path: f, override: true });
}
