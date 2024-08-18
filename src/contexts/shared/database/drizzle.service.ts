import { Inject, Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CONNECTION_POOL } from './database.module-definition';
import { databaseSchema } from './database-schema';
import { Pool } from 'pg';

@Injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof databaseSchema>;

  constructor(@Inject(CONNECTION_POOL) private readonly connectionPool: Pool) {
    this.db = drizzle(this.connectionPool, { schema: databaseSchema });
  }
}
