import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  foreignKey,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  imageUrl: varchar("image_url", { length: 255 }),
});

export const modelsTable = pgTable("models", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isPinned: boolean("is_pinned").default(false),
  hasImageGen: boolean("has_image_gen").default(false),
  hasVision: boolean("has_vision").default(false),
  isFast: boolean("is_fast").default(false),
});

export const chatsTable = pgTable("chats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  modelId: integer("model_id")
    .notNull()
    .references(() => modelsTable.id),
  title: varchar("title", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .notNull()
    .references(() => chatsTable.id),
  role: varchar("role", { length: 50, enum: ["user", "assistant"] }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
