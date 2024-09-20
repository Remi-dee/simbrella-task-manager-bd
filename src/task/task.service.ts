import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { EmailService } from 'src/mail/mail.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private readonly emailService: EmailService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = new this.taskModel({ ...createTaskDto, createdBy: user._id });
    await task.save();

    // Send task creation email notification
    await this.emailService.sendTaskUpdateNotification(
      user,
      task.title,
      'created',
    );

    return task;
  }

  async getTasks(): Promise<Task[]> {
    return this.taskModel.find().populate('createdBy assignedTo').exec();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel
      .findById(id)
      .populate('createdBy assignedTo')
      .exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Send task update email notification
    await this.emailService.sendTaskUpdateNotification(
      user,
      task.title,
      'updated',
    );

    return task;
  }

  // Task Deletion
  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Send task deletion email notification

    if (user.notificationsEnabled) {
      await this.emailService.sendTaskUpdateNotification(
        user,
        task.title,
        'deleted',
      );
    }
  }
}
