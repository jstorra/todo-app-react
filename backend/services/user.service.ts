import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UserService {
  // Find all users
  async getAll(): Promise<IUser[]> {
    return await UserRepository.getAll();
  }

  // Find user by id
  async getById(id: string): Promise<IUser | null> {
    return await UserRepository.getById(id);
  }

  // Create new user
  async create(userData: IUser): Promise<IUser> {
    const user = await UserRepository.getByEmail(userData.email || "");

    if (user) {
      throw new Error("Email already exists");
    }

    return await UserRepository.create(userData);
  }

  // Update user
  async update(id:string, userData: Partial<IUser>): Promise<IUser | null> {
    return await UserRepository.update(id, userData);
  }

  // Delete user
  async delete(id: string): Promise<IUser | null> {
    return await UserRepository.delete(id);
  }
}

export default new UserService();
