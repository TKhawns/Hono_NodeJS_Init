import { integer, pgTableCreator, varchar } from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `${name}`);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});