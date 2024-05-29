import { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UserService {
  // Find all users
  async findAll(): Promise<IUser[]> {
    return await UserRepository.findAll();
  }

  // Find user by id
  async findById(id: string): Promise<IUser | null> {
    return await UserRepository.findById(id);
  }

  // Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await UserRepository.findByEmail(email);
  }

  // Create new user
  async create(userData: IUser): Promise<IUser> {
    const user = await UserRepository.findByEmail(userData.email || "");

    if (user) {
      throw new Error("Email already exists");
    }

    return await UserRepository.create(userData);
  }

  // Update user


  // Delete user
  async delete(user: IUser): Promise<void> {
    return await UserRepository.delete(user);
  }
}

export default new UserService();
