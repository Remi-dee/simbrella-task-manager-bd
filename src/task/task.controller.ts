import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { Task } from './task.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth('Authorization') // Indicates that the endpoints require JWT Bearer Token authentication
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, user not logged in.',
  })
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks fetched successfully.',
    type: [Task],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, user not logged in.',
  })
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by its ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the task to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The task was retrieved successfully.',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiParam({
    name: 'id',
    description: 'ID of the task to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.taskService.updateTask(id, updateTaskDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({
    name: 'id',
    description: 'ID of the task to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.deleteTask(id, user);
  }
}
