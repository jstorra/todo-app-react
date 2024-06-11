import { IUser, encryptPassword } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UserService {
  // Login
  async authenticateUser(
    email: string,
    password: string
  ): Promise<boolean | undefined> {
    const user = await UserRepository.getByEmail(email);

    const isMatch = await user?.comparePassword(password);

    return isMatch;
  }

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
  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    if (userData.email) {
      const user = await UserRepository.getByEmail(userData.email);

      if (user && user._id?.toString() !== id) {
        throw new Error("Email already exists");
      }
    }

    if (userData.password) {
      const hashedPassword = await encryptPassword(userData.password);
      userData["password"] = hashedPassword;
    }

    return await UserRepository.update(id, userData);
  }

  // Delete user
  async delete(id: string): Promise<IUser | null> {
    return await UserRepository.delete(id);
  }

  // Function to validate email syntax
  async emailValidation(email: string): Promise<boolean> {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
}

export default new UserService();
