import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './project.service';
import { TaskController } from './project.controller';
import { Task, TaskSchema } from './project.schema';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule for user authentication

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    AuthModule, // Ensure AuthModule is included for the JWT auth guard
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
