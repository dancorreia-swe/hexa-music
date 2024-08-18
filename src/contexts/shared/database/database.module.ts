import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { DatabaseOptions } from './interfaces/database-options.interface';
import { Pool } from 'pg';
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS,
} from './database.module-definition';

@Module({
  providers: [
    DrizzleService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          database: databaseOptions.database,
          username: databaseOptions.user,
          password: databaseOptions.password,
        });
      },
    },
  ],
  exports: [DrizzleService],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
