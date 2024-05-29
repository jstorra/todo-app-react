import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  // Find all users
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // Find user by id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "Error: User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // Create new user
  async create(req: Request, res: Response): Promise<void> {
    try {
      const emailValidation =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(req.body.email);

      if (!emailValidation) {
        res.status(400).json({ message: "Error: Invalid email" });
        return;
      }

      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: `Error: ${(error as Error).message}` });
    }
  }

  // Update user
  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.update(req.params.id, req.body);

      if (!user) {
        res.status(404).json({ message: "Error: User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: `Error: ${(error as Error).message}` });
    }
  }

  // Delete user
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.delete(req.params.id);

      if (!user) {
        res.status(404).json({ message: "Error: User not found" });
        return;
      }

      res.status(200).json({ message: "User deleted" });
    } catch (error: any) {
      res.status(500).json({ message: `Error: ${(error as Error).message}` });
    }
  }
}

export default new UserController();
