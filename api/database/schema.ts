import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  password_hash: text("password_hash").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
});

export const employees = sqliteTable("employees", {
  employee_id: integer("employee_id").primaryKey({ autoIncrement: true }),
  employee_no: text("employee_no").notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  position: text("position").notNull(),
  created_at: integer("created_at", {
    mode: "timestamp",
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: integer("updated_at", {
    mode: "timestamp",
  }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const leaveType = sqliteTable("leave_type", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leave_name: text("leave_name").unique().notNull(),
  leave_description: text("leave_description"),
  max_days: integer("max_days").notNull(),
  created_at: integer("created_at", {
    mode: "timestamp",
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: integer("updated_at", {
    mode: "timestamp",
  }).default(sql`(CURRENT_TIMESTAMP)`),
});

const leaveStatus = {
  APPROVED: "approved",
  PENDING: "pending",
  REJECTED: "rejected",
} as const;

export type leaveStatusType = (typeof leaveStatus)[keyof typeof leaveStatus];
export const leaveRequest = sqliteTable("leave_request", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  employee_id: integer("employee_id")
    .references(() => employees.employee_id)
    .notNull(),
  leave_type_id: integer("leave_type_id")
    .references(() => leaveType.id)
    .notNull(),
  start_date: integer("start_date", {
    mode: "timestamp",
  }),
  end_date: integer("end_date", {
    mode: "timestamp",
  }),
  leave_duration: text("leave_duration").notNull(),
  status: text("status", {
    enum: [leaveStatus.APPROVED, leaveStatus.PENDING, leaveStatus.REJECTED],
  })
    .notNull()
    .default(leaveStatus.PENDING),
  created_at: integer("created_at", {
    mode: "timestamp",
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: integer("updated_at", {
    mode: "timestamp",
  }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const leaveBalances = sqliteTable("leave_balances", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  employee_id: integer("employee_id")
    .references(() => employees.employee_id)
    .notNull(),
  leave_type_id: integer("leave_type_id")
    .references(() => leaveType.id)
    .notNull(),
  available_days: integer("available_days"),
  created_at: integer("created_at", {
    mode: "timestamp",
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: integer("updated_at", {
    mode: "timestamp",
  }).default(sql`(CURRENT_TIMESTAMP)`),
});
