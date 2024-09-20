import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './task.schema';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule for user authentication
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    AuthModule, 
    MailModule
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
