import { pgTable, serial, text } from 'drizzle-orm/pg-core';

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  chatId: text('chat_id'),
  username: text('content'),
});

export const databaseSchema = {
  users,
};

export { users };
