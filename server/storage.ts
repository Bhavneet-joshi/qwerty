import {
  users,
  contracts,
  contractComments,
  employeePermissions,
  type User,
  type UpsertUser,
  type Contract,
  type InsertContract,
  type ContractComment,
  type InsertContractComment,
  type EmployeePermission,
  type InsertEmployeePermission,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, count, sql } from "drizzle-orm";
import { mockUsers, mockCredentials } from "./mockUsers";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Mock authentication
  authenticateUser(email: string, password: string): Promise<User | undefined>;
  
  // User management
  getAllUsers(): Promise<User[]>;
  getUsersByRole(role: string): Promise<User[]>;
  updateUserRole(userId: string, role: string): Promise<User>;
  updateUserProfile(userId: string, data: Partial<User>): Promise<User>;
  
  // Contract operations
  getContract(id: number): Promise<Contract | undefined>;
  getContractsByClient(clientId: string): Promise<Contract[]>;
  getContractsByEmployee(employeeId: string): Promise<Contract[]>;
  getAllContracts(): Promise<Contract[]>;
  createContract(contract: InsertContract): Promise<Contract>;
  updateContract(id: number, data: Partial<Contract>): Promise<Contract>;
  deleteContract(id: number): Promise<void>;
  
  // Contract comments
  getContractComments(contractId: number): Promise<ContractComment[]>;
  addContractComment(comment: InsertContractComment): Promise<ContractComment>;
  updateContractComment(id: number, data: Partial<ContractComment>): Promise<ContractComment>;
  deleteContractComment(id: number): Promise<void>;
  
  // Employee permissions
  getEmployeePermissions(employeeId: string): Promise<EmployeePermission[]>;
  getContractPermissions(contractId: number): Promise<EmployeePermission[]>;
  setEmployeePermission(permission: InsertEmployeePermission): Promise<EmployeePermission>;
  updateEmployeePermission(id: number, data: Partial<EmployeePermission>): Promise<EmployeePermission>;
  removeEmployeePermission(id: number): Promise<void>;
  
  // Dashboard stats
  getContractStats(): Promise<{
    total: number;
    active: number;
    completed: number;
    cancelled: number;
  }>;
  getClientContractCount(clientId: string): Promise<number>;
  getEmployeeContractCount(employeeId: string): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  // Initialize mock users in database on first run
  private async initializeMockUsers() {
    try {
      for (const mockUser of mockUsers) {
        await this.upsertUser(mockUser as UpsertUser);
      }
    } catch (error) {
      console.log("Mock users already exist or error initializing:", error);
    }
  }

  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    // Initialize mock users if needed
    if (mockUsers.find(u => u.id === id)) {
      await this.initializeMockUsers();
    }
    
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  // Mock login method for demo purposes
  async authenticateUser(email: string, password: string): Promise<User | undefined> {
    await this.initializeMockUsers();
    
    if (mockCredentials[email as keyof typeof mockCredentials] === password) {
      const mockUser = mockUsers.find(u => u.email === email);
      if (mockUser) {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user;
      }
    }
    return undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // User management
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(asc(users.createdAt));
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.role, role as any));
  }

  async updateUserRole(userId: string, role: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ role: role as any, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Contract operations
  async getContract(id: number): Promise<Contract | undefined> {
    const [contract] = await db.select().from(contracts).where(eq(contracts.id, id));
    return contract;
  }

  async getContractsByClient(clientId: string): Promise<Contract[]> {
    return await db
      .select()
      .from(contracts)
      .where(eq(contracts.clientId, clientId))
      .orderBy(desc(contracts.createdAt));
  }

  async getContractsByEmployee(employeeId: string): Promise<Contract[]> {
    return await db
      .select()
      .from(contracts)
      .where(eq(contracts.assignedEmployeeId, employeeId))
      .orderBy(desc(contracts.createdAt));
  }

  async getAllContracts(): Promise<Contract[]> {
    return await db.select().from(contracts).orderBy(desc(contracts.createdAt));
  }

  async createContract(contract: InsertContract): Promise<Contract> {
    const [newContract] = await db.insert(contracts).values(contract).returning();
    return newContract;
  }

  async updateContract(id: number, data: Partial<Contract>): Promise<Contract> {
    const [contract] = await db
      .update(contracts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contracts.id, id))
      .returning();
    return contract;
  }

  async deleteContract(id: number): Promise<void> {
    await db.delete(contracts).where(eq(contracts.id, id));
  }

  // Contract comments
  async getContractComments(contractId: number): Promise<ContractComment[]> {
    return await db
      .select()
      .from(contractComments)
      .where(eq(contractComments.contractId, contractId))
      .orderBy(asc(contractComments.createdAt));
  }

  async addContractComment(comment: InsertContractComment): Promise<ContractComment> {
    const [newComment] = await db.insert(contractComments).values(comment).returning();
    return newComment;
  }

  async updateContractComment(id: number, data: Partial<ContractComment>): Promise<ContractComment> {
    const [comment] = await db
      .update(contractComments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contractComments.id, id))
      .returning();
    return comment;
  }

  async deleteContractComment(id: number): Promise<void> {
    await db.delete(contractComments).where(eq(contractComments.id, id));
  }

  // Employee permissions
  async getEmployeePermissions(employeeId: string): Promise<EmployeePermission[]> {
    return await db
      .select()
      .from(employeePermissions)
      .where(eq(employeePermissions.employeeId, employeeId));
  }

  async getContractPermissions(contractId: number): Promise<EmployeePermission[]> {
    return await db
      .select()
      .from(employeePermissions)
      .where(eq(employeePermissions.contractId, contractId));
  }

  async setEmployeePermission(permission: InsertEmployeePermission): Promise<EmployeePermission> {
    const [newPermission] = await db
      .insert(employeePermissions)
      .values(permission)
      .returning();
    return newPermission;
  }

  async updateEmployeePermission(id: number, data: Partial<EmployeePermission>): Promise<EmployeePermission> {
    const [permission] = await db
      .update(employeePermissions)
      .set(data)
      .where(eq(employeePermissions.id, id))
      .returning();
    return permission;
  }

  async removeEmployeePermission(id: number): Promise<void> {
    await db.delete(employeePermissions).where(eq(employeePermissions.id, id));
  }

  // Dashboard stats
  async getContractStats(): Promise<{
    total: number;
    active: number;
    completed: number;
    cancelled: number;
  }> {
    const [stats] = await db
      .select({
        total: count(),
        active: sql<number>`sum(case when status = 'active' then 1 else 0 end)`,
        completed: sql<number>`sum(case when status = 'completed' then 1 else 0 end)`,
        cancelled: sql<number>`sum(case when status = 'cancelled' then 1 else 0 end)`,
      })
      .from(contracts);
    
    return {
      total: stats.total,
      active: Number(stats.active),
      completed: Number(stats.completed),
      cancelled: Number(stats.cancelled),
    };
  }

  async getClientContractCount(clientId: string): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(contracts)
      .where(eq(contracts.clientId, clientId));
    return result.count;
  }

  async getEmployeeContractCount(employeeId: string): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(contracts)
      .where(eq(contracts.assignedEmployeeId, employeeId));
    return result.count;
  }

  // Contract methods for client portal
  async getContractsSummary(userId: string, role: string): Promise<any> {
    try {
      let baseQuery;
      
      if (role === 'client') {
        baseQuery = db.select().from(contracts).where(eq(contracts.clientId, userId));
      } else if (role === 'employee') {
        baseQuery = db.select({
          ...contracts,
        }).from(contracts)
          .innerJoin(employeePermissions, eq(contracts.id, employeePermissions.contractId))
          .where(eq(employeePermissions.employeeId, userId));
      } else if (role === 'admin') {
        baseQuery = db.select().from(contracts);
      } else {
        return { total: 0, active: 0, inProgress: 0, totalValue: 0 };
      }

      const allContracts = await baseQuery;
      
      const summary = {
        total: allContracts.length,
        active: allContracts.filter((c: any) => c.status === 'active').length,
        inProgress: allContracts.filter((c: any) => c.status === 'in_progress').length,
        totalValue: allContracts.reduce((sum: number, c: any) => sum + (c.contractValue || 0), 0),
      };

      return summary;
    } catch (error) {
      console.error("Error getting contracts summary:", error);
      return { total: 0, active: 0, inProgress: 0, totalValue: 0 };
    }
  }

  async getRecentContracts(userId: string, role: string, limit: number = 5): Promise<Contract[]> {
    try {
      let query;
      
      if (role === 'client') {
        query = db.select().from(contracts)
          .where(eq(contracts.clientId, userId))
          .orderBy(desc(contracts.createdAt))
          .limit(limit);
      } else if (role === 'employee') {
        query = db.select({
          ...contracts,
        }).from(contracts)
          .innerJoin(employeePermissions, eq(contracts.id, employeePermissions.contractId))
          .where(eq(employeePermissions.employeeId, userId))
          .orderBy(desc(contracts.createdAt))
          .limit(limit);
      } else if (role === 'admin') {
        query = db.select().from(contracts)
          .orderBy(desc(contracts.createdAt))
          .limit(limit);
      } else {
        return [];
      }

      return await query;
    } catch (error) {
      console.error("Error getting recent contracts:", error);
      return [];
    }
  }

  async getContracts(userId: string, role: string, filters: any = {}): Promise<Contract[]> {
    try {
      let baseQuery;
      
      if (role === 'client') {
        baseQuery = db.select().from(contracts).where(eq(contracts.clientId, userId));
      } else if (role === 'employee') {
        baseQuery = db.select({
          ...contracts,
        }).from(contracts)
          .innerJoin(employeePermissions, eq(contracts.id, employeePermissions.contractId))
          .where(eq(employeePermissions.employeeId, userId));
      } else if (role === 'admin') {
        baseQuery = db.select().from(contracts);
      } else {
        return [];
      }

      return await baseQuery.orderBy(desc(contracts.createdAt));
    } catch (error) {
      console.error("Error getting contracts:", error);
      return [];
    }
  }

  async getContractWithDetails(contractId: number, userId: string, role: string): Promise<Contract | undefined> {
    try {
      let query;
      
      if (role === 'client') {
        query = db.select().from(contracts)
          .where(and(eq(contracts.id, contractId), eq(contracts.clientId, userId)));
      } else if (role === 'employee') {
        query = db.select({
          ...contracts,
        }).from(contracts)
          .innerJoin(employeePermissions, eq(contracts.id, employeePermissions.contractId))
          .where(and(eq(contracts.id, contractId), eq(employeePermissions.employeeId, userId)));
      } else if (role === 'admin') {
        query = db.select().from(contracts).where(eq(contracts.id, contractId));
      } else {
        return undefined;
      }

      const result = await query;
      return result[0];
    } catch (error) {
      console.error("Error getting contract:", error);
      return undefined;
    }
  }

  async resolveComment(commentId: number): Promise<ContractComment | undefined> {
    try {
      const [comment] = await db
        .update(contractComments)
        .set({ isResolved: true, updatedAt: new Date() })
        .where(eq(contractComments.id, commentId))
        .returning();
      return comment;
    } catch (error) {
      console.error("Error resolving comment:", error);
      return undefined;
    }
  }
}

export const storage = new DatabaseStorage();
