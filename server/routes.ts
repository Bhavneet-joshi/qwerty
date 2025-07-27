import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import contractRoutes from "./routes/contracts";
import { setupMockAuth } from "./routes/mockAuth";
import { z } from "zod";
import {
  insertContractSchema,
  insertContractCommentSchema,
  insertEmployeePermissionSchema,
  contractFormSchema,
  commentFormSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);
  
  // Mock authentication for demo
  setupMockAuth(app);
  
  // Contract routes
  app.use(contractRoutes);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User management routes
  app.get('/api/users', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get('/api/users/role/:role', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
      const users = await storage.getUsersByRole(req.params.role);
      res.json(users);
    } catch (error) {
      console.error("Error fetching users by role:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.put('/api/users/:id/role', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
      const { role } = req.body;
      const user = await storage.updateUserRole(req.params.id, role);
      res.json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  app.put('/api/users/:id/profile', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      if (currentUser?.role !== 'admin' && req.user.claims.sub !== req.params.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      const user = await storage.updateUserProfile(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update user profile" });
    }
  });

  // Contract routes
  app.get('/api/contracts', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      let contracts;
      
      if (currentUser?.role === 'admin') {
        contracts = await storage.getAllContracts();
      } else if (currentUser?.role === 'client') {
        contracts = await storage.getContractsByClient(req.user.claims.sub);
      } else if (currentUser?.role === 'employee') {
        contracts = await storage.getContractsByEmployee(req.user.claims.sub);
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(contracts);
    } catch (error) {
      console.error("Error fetching contracts:", error);
      res.status(500).json({ message: "Failed to fetch contracts" });
    }
  });

  app.get('/api/contracts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const contract = await storage.getContract(contractId);
      
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      
      const currentUser = await storage.getUser(req.user.claims.sub);
      
      // Check access permissions
      if (currentUser?.role === 'admin' || 
          contract.clientId === req.user.claims.sub || 
          contract.assignedEmployeeId === req.user.claims.sub) {
        res.json(contract);
      } else {
        res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      console.error("Error fetching contract:", error);
      res.status(500).json({ message: "Failed to fetch contract" });
    }
  });

  app.post('/api/contracts', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const validatedData = contractFormSchema.parse(req.body);
      const contract = await storage.createContract(validatedData);
      res.json(contract);
    } catch (error) {
      console.error("Error creating contract:", error);
      res.status(500).json({ message: "Failed to create contract" });
    }
  });

  app.put('/api/contracts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const contract = await storage.getContract(contractId);
      
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      
      const currentUser = await storage.getUser(req.user.claims.sub);
      
      // Check permissions
      if (currentUser?.role !== 'admin' && 
          contract.assignedEmployeeId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updatedContract = await storage.updateContract(contractId, req.body);
      res.json(updatedContract);
    } catch (error) {
      console.error("Error updating contract:", error);
      res.status(500).json({ message: "Failed to update contract" });
    }
  });

  app.delete('/api/contracts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const contractId = parseInt(req.params.id);
      await storage.deleteContract(contractId);
      res.json({ message: "Contract deleted successfully" });
    } catch (error) {
      console.error("Error deleting contract:", error);
      res.status(500).json({ message: "Failed to delete contract" });
    }
  });

  // Contract comments routes
  app.get('/api/contracts/:id/comments', isAuthenticated, async (req: any, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const contract = await storage.getContract(contractId);
      
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      
      const currentUser = await storage.getUser(req.user.claims.sub);
      
      // Check access permissions
      if (currentUser?.role === 'admin' || 
          contract.clientId === req.user.claims.sub || 
          contract.assignedEmployeeId === req.user.claims.sub) {
        const comments = await storage.getContractComments(contractId);
        res.json(comments);
      } else {
        res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      console.error("Error fetching contract comments:", error);
      res.status(500).json({ message: "Failed to fetch contract comments" });
    }
  });

  app.post('/api/contracts/:id/comments', isAuthenticated, async (req: any, res) => {
    try {
      const contractId = parseInt(req.params.id);
      const contract = await storage.getContract(contractId);
      
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      
      const currentUser = await storage.getUser(req.user.claims.sub);
      
      // Check access permissions
      if (currentUser?.role === 'admin' || 
          contract.clientId === req.user.claims.sub || 
          contract.assignedEmployeeId === req.user.claims.sub) {
        
        const validatedData = commentFormSchema.parse({
          ...req.body,
          contractId,
          userId: req.user.claims.sub,
        });
        
        const comment = await storage.addContractComment(validatedData);
        res.json(comment);
      } else {
        res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      console.error("Error adding contract comment:", error);
      res.status(500).json({ message: "Failed to add contract comment" });
    }
  });

  app.put('/api/comments/:id', isAuthenticated, async (req: any, res) => {
    try {
      const commentId = parseInt(req.params.id);
      const comment = await storage.updateContractComment(commentId, req.body);
      res.json(comment);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ message: "Failed to update comment" });
    }
  });

  app.delete('/api/comments/:id', isAuthenticated, async (req: any, res) => {
    try {
      const commentId = parseInt(req.params.id);
      await storage.deleteContractComment(commentId);
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Failed to delete comment" });
    }
  });

  // Dashboard stats routes
  app.get('/api/dashboard/stats', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      
      if (currentUser?.role === 'admin') {
        const stats = await storage.getContractStats();
        res.json(stats);
      } else if (currentUser?.role === 'client') {
        const count = await storage.getClientContractCount(req.user.claims.sub);
        res.json({ contractCount: count });
      } else if (currentUser?.role === 'employee') {
        const count = await storage.getEmployeeContractCount(req.user.claims.sub);
        res.json({ contractCount: count });
      } else {
        res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Employee permissions routes
  app.get('/api/permissions/employee/:id', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const permissions = await storage.getEmployeePermissions(req.params.id);
      res.json(permissions);
    } catch (error) {
      console.error("Error fetching employee permissions:", error);
      res.status(500).json({ message: "Failed to fetch employee permissions" });
    }
  });

  app.post('/api/permissions', isAuthenticated, async (req: any, res) => {
    try {
      const currentUser = await storage.getUser(req.user.claims.sub);
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const validatedData = insertEmployeePermissionSchema.parse(req.body);
      const permission = await storage.setEmployeePermission(validatedData);
      res.json(permission);
    } catch (error) {
      console.error("Error setting employee permission:", error);
      res.status(500).json({ message: "Failed to set employee permission" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
