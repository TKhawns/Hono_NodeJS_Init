import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema.js';
import * as schema from './schema.js'

export type NewUser = typeof usersTable.$inferInsert;


export const db = drizzle(process.env.DATABASE_URL!, {schema});