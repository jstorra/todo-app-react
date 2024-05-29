import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default new UserController();
