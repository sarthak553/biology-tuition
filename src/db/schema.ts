import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  studentClass: text("student_class").notNull(),
  school: text("school").notNull(),
  message: text("message").notNull().default(""),
  preferredTime: text("preferred_time").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
