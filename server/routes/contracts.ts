import { Router } from "express";
import { isAuthenticated } from "../replitAuth";
import { storage } from "../storage";
import { insertContractSchema, insertContractCommentSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// Get contracts summary for dashboard
router.get("/api/contracts/summary", isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const role = req.user.claims.role || "client";
    
    const summary = await storage.getContractsSummary(userId, role);
    res.json(summary);
  } catch (error) {
    console.error("Error fetching contracts summary:", error);
    res.status(500).json({ message: "Failed to fetch contracts summary" });
  }
});

// Get recent contracts
router.get("/api/contracts/recent/:limit", isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const role = req.user.claims.role || "client";
    const limit = parseInt(req.params.limit) || 5;
    
    const contracts = await storage.getRecentContracts(userId, role, limit);
    res.json(contracts);
  } catch (error) {
    console.error("Error fetching recent contracts:", error);
    res.status(500).json({ message: "Failed to fetch recent contracts" });
  }
});

// Get all contracts with filtering
router.get("/api/contracts", isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const role = req.user.claims.role || "client";
    const { search, status, date } = req.query;
    
    const contracts = await storage.getContracts(userId, role, {
      search: search as string,
      status: status as string,
      date: date as string,
    });
    res.json(contracts);
  } catch (error) {
    console.error("Error fetching contracts:", error);
    res.status(500).json({ message: "Failed to fetch contracts" });
  }
});

// Get specific contract
router.get("/api/contracts/:id", isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const role = req.user.claims.role || "client";
    const contractId = parseInt(req.params.id);
    
    const contract = await storage.getContractWithDetails(contractId, userId, role);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    
    res.json(contract);
  } catch (error) {
    console.error("Error fetching contract:", error);
    res.status(500).json({ message: "Failed to fetch contract" });
  }
});

// Create new contract (admin only)
router.post("/api/contracts", isAuthenticated, async (req: any, res) => {
  try {
    const role = req.user.claims.role || "client";
    if (role !== "admin") {
      return res.status(403).json({ message: "Only admins can create contracts" });
    }
    
    const validatedData = insertContractSchema.parse(req.body);
    const contract = await storage.createContract(validatedData);
    res.status(201).json(contract);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid data", errors: error.errors });
    }
    console.error("Error creating contract:", error);
    res.status(500).json({ message: "Failed to create contract" });
  }
});

// Update contract (admin only)
router.patch("/api/contracts/:id", isAuthenticated, async (req: any, res) => {
  try {
    const role = req.user.claims.role || "client";
    if (role !== "admin") {
      return res.status(403).json({ message: "Only admins can update contracts" });
    }
    
    const contractId = parseInt(req.params.id);
    const validatedData = insertContractSchema.partial().parse(req.body);
    
    const contract = await storage.updateContract(contractId, validatedData);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    
    res.json(contract);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid data", errors: error.errors });
    }
    console.error("Error updating contract:", error);
    res.status(500).json({ message: "Failed to update contract" });
  }
});

// Get contract comments
router.get("/api/contracts/:id/comments", isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const role = req.user.claims.role || "client";
    const contractId = parseInt(req.params.id);
    
    // Check if user has access to this contract
    const contract = await storage.getContractWithDetails(contractId, userId, role);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    
    const comments = await storage.getContractComments(contractId);
    res.json(comments);
  } catch (error) {
    console.error("Error fetching contract comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

// Add contract comment
router.post("/api/contracts/:id/comments", isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const role = req.user.claims.role || "client";
    const contractId = parseInt(req.params.id);
    
    // Check if user has access to this contract
    const contract = await storage.getContractWithDetails(contractId, userId, role);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    
    const validatedData = insertContractCommentSchema.parse({
      ...req.body,
      contractId,
      userId,
    });
    
    const comment = await storage.addContractComment(validatedData);
    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid data", errors: error.errors });
    }
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
});

// Resolve comment
router.patch("/api/contracts/:id/comments/:commentId/resolve", isAuthenticated, async (req: any, res) => {
  try {
    const userId = req.user.claims.sub;
    const role = req.user.claims.role || "client";
    const contractId = parseInt(req.params.id);
    const commentId = parseInt(req.params.commentId);
    
    // Check if user has access to this contract
    const contract = await storage.getContractWithDetails(contractId, userId, role);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    
    const comment = await storage.resolveComment(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    res.json(comment);
  } catch (error) {
    console.error("Error resolving comment:", error);
    res.status(500).json({ message: "Failed to resolve comment" });
  }
});

export default router;