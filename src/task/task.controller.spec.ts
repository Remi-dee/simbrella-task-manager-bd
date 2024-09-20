import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: TaskService;

  // Mock TaskService
  const mockTaskService = {
    createTask: jest.fn(),
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should call taskService.createTask and return the result', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test description',
      };
      const user = { _id: 'user123', notificationsEnabled: true };
      const createdTask = {
        _id: 'task123',
        title: 'Test Task',
        description: 'Test description',
        createdBy: user._id,
      };

      mockTaskService.createTask.mockResolvedValue(createdTask);

      const result = await controller.createTask(createTaskDto, user);
      expect(taskService.createTask).toHaveBeenCalledWith(createTaskDto, user);
      expect(result).toEqual(createdTask);
    });
  });

  describe('getTasks', () => {
    it('should call taskService.getTasks and return the result', async () => {
      const tasks = [{ _id: 'task123', title: 'Test Task' }];
      mockTaskService.getTasks.mockResolvedValue(tasks);

      const result = await controller.getTasks();
      expect(taskService.getTasks).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  describe('getTaskById', () => {
    it('should call taskService.getTaskById and return the result', async () => {
      const task = { _id: 'task123', title: 'Test Task' };
      mockTaskService.getTaskById.mockResolvedValue(task);

      const result = await controller.getTaskById('task123');
      expect(taskService.getTaskById).toHaveBeenCalledWith('task123');
      expect(result).toEqual(task);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockTaskService.getTaskById.mockResolvedValue(null);

      await expect(controller.getTaskById('invalidId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTask', () => {
    it('should call taskService.updateTask and return the updated task', async () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const user = { _id: 'user123', notificationsEnabled: true };
      const updatedTask = { _id: 'task123', title: 'Updated Task' };

      mockTaskService.updateTask.mockResolvedValue(updatedTask);

      const result = await controller.updateTask(
        'task123',
        updateTaskDto,
        user,
      );
      expect(taskService.updateTask).toHaveBeenCalledWith(
        'task123',
        updateTaskDto,
        user,
      );
      expect(result).toEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should call taskService.deleteTask', async () => {
      const user = { _id: 'user123', notificationsEnabled: true };

      mockTaskService.deleteTask.mockResolvedValue(undefined);

      await controller.deleteTask('task123', user);
      expect(taskService.deleteTask).toHaveBeenCalledWith('task123', user);
    });

    it('should throw NotFoundException if task not found for deletion', async () => {
      const user = { _id: 'user123', notificationsEnabled: true };

      mockTaskService.deleteTask.mockRejectedValue(new NotFoundException());

      await expect(controller.deleteTask('invalidId', user)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
