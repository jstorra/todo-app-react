import User, { IUser } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UserService {
  validateEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    try {
      const email = userData.email || "";
      if (!this.validateEmail(email)) {
        throw new Error("Invalid email");
      }

      const user = await UserRepository.findByEmail(email);
      if (user) {
        throw new Error("Email already exists");
      }

      return await UserRepository.create(userData);
    } catch (error: any) {
      throw new Error("Error: " + (error as Error).message);
    }
  }
}

export default new UserService();
