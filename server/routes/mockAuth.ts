import type { Express } from "express";
import { storage } from "../storage";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export function setupMockAuth(app: Express) {
  // Mock login endpoint for demo purposes
  app.post('/api/mock-login', async (req: any, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.authenticateUser(email, password);
      
      if (user) {
        // Create a proper session for the mock user
        req.session.passport = {
          user: {
            claims: {
              sub: user.id,
              email: user.email,
              first_name: user.firstName,
              last_name: user.lastName,
              profile_image_url: user.profileImageUrl
            }
          }
        };
        
        await new Promise((resolve, reject) => {
          req.session.save((err: any) => {
            if (err) reject(err);
            else resolve(null);
          });
        });
        
        res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            profileImageUrl: user.profileImageUrl
          },
          message: `Welcome back, ${user.firstName}!`
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
    } catch (error) {
      console.error("Mock login error:", error);
      res.status(400).json({
        success: false,
        message: "Invalid request data"
      });
    }
  });

  // Get demo accounts list
  app.get('/api/demo-accounts', (req, res) => {
    res.json([
      { role: "Client", email: "client@demo.com", password: "demo123" },
      { role: "Employee", email: "employee@demo.com", password: "demo123" },
      { role: "Admin", email: "admin@demo.com", password: "demo123" }
    ]);
  });
}