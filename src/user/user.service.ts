import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/auth.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserPreferences(
    userId: any,
  ): Promise<{ notificationsEnabled: boolean }> {
    const user = await this.userModel
      .findById(userId)
      .select('notificationsEnabled')
      .exec();
    return { notificationsEnabled: user.notificationsEnabled };
  }

  async updatePreferences(
    userId: any,
    notificationsEnabled: boolean,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { notificationsEnabled },
      { new: true },
    );
  }

  async deleteAllUsers(): Promise<{ message: string }> {
    await this.userModel.deleteMany(); // Deletes all users
    return { message: 'All users have been deleted' };
  }
}
