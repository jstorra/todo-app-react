import User, { IUser } from "../models/user.model";

class UserRepository {
  // Find all users
  async getAll(): Promise<IUser[]> {
    return await User.find();
  }

  // Find user by id
  async getById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  // Find user by email
  async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  // Create new user
  async create(userData: IUser): Promise<IUser> {
    return await new User(userData).save();
  }

  // Update user
  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    // Establishing { new: true } means the response will have the new user data instead of the old
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  // Delete user
  async delete(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
