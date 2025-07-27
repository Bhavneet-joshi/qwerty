import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
  integer,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - mandatory for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User roles enum
export const userRoleEnum = pgEnum("user_role", ["client", "employee", "admin"]);

// User storage table - mandatory for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").default("client"),
  panNumber: varchar("pan_number"),
  aadhaarNumber: varchar("aadhaar_number"),
  contactNumber: varchar("contact_number"),
  address: text("address"),
  employeeId: varchar("employee_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contract status enum
export const contractStatusEnum = pgEnum("contract_status", [
  "draft",
  "active",
  "in_progress",
  "completed",
  "cancelled",
]);

// Contracts table
export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  clientId: varchar("client_id").references(() => users.id),
  assignedEmployeeId: varchar("assigned_employee_id").references(() => users.id),
  status: contractStatusEnum("status").default("draft"),
  contractDate: date("contract_date").notNull(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  contractValue: integer("contract_value"),
  pdfUrl: varchar("pdf_url"),
  pdfContent: text("pdf_content"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contract comments table
export const contractComments = pgTable("contract_comments", {
  id: serial("id").primaryKey(),
  contractId: integer("contract_id").references(() => contracts.id),
  userId: varchar("user_id").references(() => users.id),
  lineNumber: integer("line_number"),
  comment: text("comment").notNull(),
  isResolved: boolean("is_resolved").default(false),
  parentCommentId: integer("parent_comment_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Employee permissions table
export const employeePermissions = pgTable("employee_permissions", {
  id: serial("id").primaryKey(),
  employeeId: varchar("employee_id").references(() => users.id),
  contractId: integer("contract_id").references(() => contracts.id),
  canRead: boolean("can_read").default(true),
  canWrite: boolean("can_write").default(false),
  canEdit: boolean("can_edit").default(false),
  canDelete: boolean("can_delete").default(false),
  isReviewer: boolean("is_reviewer").default(false),
  isPreparer: boolean("is_preparer").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  clientContracts: many(contracts, { relationName: "clientContracts" }),
  employeeContracts: many(contracts, { relationName: "employeeContracts" }),
  comments: many(contractComments),
  permissions: many(employeePermissions),
}));

export const contractsRelations = relations(contracts, ({ one, many }) => ({
  client: one(users, {
    fields: [contracts.clientId],
    references: [users.id],
    relationName: "clientContracts",
  }),
  assignedEmployee: one(users, {
    fields: [contracts.assignedEmployeeId],
    references: [users.id],
    relationName: "employeeContracts",
  }),
  comments: many(contractComments),
  permissions: many(employeePermissions),
}));

export const contractCommentsRelations = relations(contractComments, ({ one }) => ({
  contract: one(contracts, {
    fields: [contractComments.contractId],
    references: [contracts.id],
  }),
  user: one(users, {
    fields: [contractComments.userId],
    references: [users.id],
  }),
}));

export const employeePermissionsRelations = relations(employeePermissions, ({ one }) => ({
  employee: one(users, {
    fields: [employeePermissions.employeeId],
    references: [users.id],
  }),
  contract: one(contracts, {
    fields: [employeePermissions.contractId],
    references: [contracts.id],
  }),
}));

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertContract = typeof contracts.$inferInsert;
export type Contract = typeof contracts.$inferSelect;
export type InsertContractComment = typeof contractComments.$inferInsert;
export type ContractComment = typeof contractComments.$inferSelect;
export type InsertEmployeePermission = typeof employeePermissions.$inferInsert;
export type EmployeePermission = typeof employeePermissions.$inferSelect;

// Zod schemas
export const insertUserSchema = createInsertSchema(users);
export const insertContractSchema = createInsertSchema(contracts);
export const insertContractCommentSchema = createInsertSchema(contractComments);
export const insertEmployeePermissionSchema = createInsertSchema(employeePermissions);

// Extended schemas for forms
export const registerUserSchema = z.object({
  id: z.string().default(""),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  captcha: z.string().min(1, "Please complete the CAPTCHA"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  mobileOtp: z.string().length(6, "Mobile OTP must be 6 digits"),
  emailOtp: z.string().length(6, "Email OTP must be 6 digits"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["client", "employee", "admin"]).default("client"),
  isActive: z.boolean().default(true),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const contractFormSchema = insertContractSchema.extend({
  clientId: z.string().min(1),
  assignedEmployeeId: z.string().optional(),
  contractDate: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const commentFormSchema = insertContractCommentSchema.extend({
  comment: z.string().min(1),
  lineNumber: z.number().optional(),
});
