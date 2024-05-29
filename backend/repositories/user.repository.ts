import User, { IUser } from "../models/user.model";

class UserRepository {
  // Find all users
  async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  // Find user by id
  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
  // Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  // Create new user
  async create(userData: IUser): Promise<IUser> {
    return await new User(userData).save();
  }

  // Update user


  // Delete user
  async delete(user: IUser): Promise<void> {
    return await user.deleteOne();
  }
}

export default new UserRepository();
