import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  // Find all users
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // Find user by id
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "Error: User not found" });
      } else {
        res.status(201).json(user);
      }
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // Find user by email
  async findByEmail(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.findByEmail(req.params.email);

      if (!user) {
        res.status(404).json({ message: "Error: User not found" });
      } else {
        res.status(201).json(user);
      }
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
      } else {
        const user = await UserService.create(req.body);
        res.status(201).json(user);
      }
    } catch (error: any) {
      res.status(500).json({ message: `Error: ${(error as Error).message}` });
    }
  }

  // Delete user
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "Error: User not found" });
      } else {
        UserService.delete(user);
        res.status(201).json();
      }
    } catch (error: any) {
      res.status(500).json({ message: `Error: ${(error as Error).message}` });
    }
  }
}

export default new UserController();
