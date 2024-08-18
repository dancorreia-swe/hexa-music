import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default defineConfig({
  schema: './src/common/database/database-schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    user: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    ssl:
      configService.get('DB_HOST') == ('localhost' || '127.0.0.1')
        ? false
        : true,
  },
});
