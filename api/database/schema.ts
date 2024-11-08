import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  password_hash: text("password_hash").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
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
    mode: "timestamp_ms",
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: integer("updated_at", {
    mode: "timestamp_ms",
  }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const employeeRelations = relations(employees, ({ many }) => ({
  leaveRequest: many(leaveRequest),
  leaveBalances: many(leaveBalances),
}));

export const leaveType = sqliteTable("leave_type", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  leave_name: text("leave_name").unique().notNull(),
  leave_description: text("leave_description"),
  max_days: integer("max_days").notNull(),
  created_at: integer("created_at", {
    mode: "timestamp_ms",
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: integer("updated_at", {
    mode: "timestamp_ms",
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
    .references(() => employees.employee_id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  leave_type_id: integer("leave_type_id")
    .references(() => leaveType.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    })
    .notNull(),
  deducted_leave_type_id: integer("deducted_leave_type_id")
    .references(() => leaveType.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    })
    .notNull(),
  start_date: integer("start_date", {
    mode: "timestamp",
  }).notNull(),
  end_date: integer("end_date", {
    mode: "timestamp",
  }),
  leave_duration: text("leave_duration").notNull(),
  remark: text("remark"),
  status: text("status", {
    enum: [leaveStatus.APPROVED, leaveStatus.PENDING, leaveStatus.REJECTED],
  }).default(leaveStatus.PENDING),
  created_at: integer("created_at", {
    mode: "timestamp_ms",
  })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updated_at: integer("updated_at", {
    mode: "timestamp_ms",
  }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const leaveRequestRelations = relations(leaveRequest, ({ one }) => ({
  employee: one(employees, {
    fields: [leaveRequest.employee_id],
    references: [employees.employee_id],
  }),
  leaveType: one(leaveType, {
    fields: [leaveRequest.leave_type_id],
    references: [leaveType.id],
  }),
  deductedLeaveRequests: one(leaveType, {
    fields: [leaveRequest.deducted_leave_type_id],
    references: [leaveType.id],
  }),
}));

export const leaveBalances = sqliteTable("leave_balances", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  employee_id: integer("employee_id")
    .references(() => employees.employee_id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  leave_type_id: integer("leave_type_id")
    .references(() => leaveType.id, {
      onUpdate: "cascade",
      onDelete: "set null",
    })
    .notNull(),
  available_days: integer("available_days").notNull(),
  created_at: integer("created_at", {
    mode: "timestamp_ms",
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: integer("updated_at", {
    mode: "timestamp_ms",
  }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const leaveBalancesRelation = relations(leaveBalances, ({ one }) => ({
  employee: one(employees, {
    fields: [leaveBalances.employee_id],
    references: [employees.employee_id],
  }),
  leaveType: one(leaveType, {
    fields: [leaveBalances.leave_type_id],
    references: [leaveType.id],
  }),
}));
