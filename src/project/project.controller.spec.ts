import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  const mockProjectService = {
    createProject: jest.fn((dto: CreateProjectDto) => {
      return { id: '1', ...dto };
    }),
    getProjects: jest.fn(() => [
      { id: '1', name: 'Project 1' },
      { id: '2', name: 'Project 2' },
    ]),
    getProjectById: jest.fn((id: string) => ({ id, name: 'Test Project' })),
    updateProject: jest.fn((id: string, dto: UpdateProjectDto) => ({
      id,
      ...dto,
    })),
    deleteProject: jest.fn((id: string) => ({ success: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: mockProjectService,
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProject', () => {
    it('should create a new project', async () => {
      const createProjectDto: CreateProjectDto = {
        title: 'New Project',
        description: 'First project',
      };
      expect(await controller.createProject(createProjectDto)).toEqual({
        id: '1',
        ...createProjectDto,
      });
      expect(service.createProject).toHaveBeenCalledWith(createProjectDto);
    });
  });

  describe('getProjects', () => {
    it('should return an array of projects', async () => {
      expect(await controller.getProjects()).toEqual([
        { id: '1', name: 'Project 1' },
        { id: '2', name: 'Project 2' },
      ]);
      expect(service.getProjects).toHaveBeenCalled();
    });
  });

  describe('getProjectById', () => {
    it('should return a single project by ID', async () => {
      const projectId = '1';
      expect(await controller.getProjectById(projectId)).toEqual({
        id: projectId,
        name: 'Test Project',
      });
      expect(service.getProjectById).toHaveBeenCalledWith(projectId);
    });
  });

  describe('updateProject', () => {
    it('should update an existing project', async () => {
      const updateProjectDto: UpdateProjectDto = { title: 'Updated Project' };
      const projectId = '1';
      expect(
        await controller.updateProject(projectId, updateProjectDto),
      ).toEqual({
        id: projectId,
        ...updateProjectDto,
      });
      expect(service.updateProject).toHaveBeenCalledWith(
        projectId,
        updateProjectDto,
      );
    });
  });

  describe('deleteProject', () => {
    it('should delete a project by ID', async () => {
      const projectId = '1';
      expect(await controller.deleteProject(projectId)).toEqual({
        success: true,
      });
      expect(service.deleteProject).toHaveBeenCalledWith(projectId);
    });
  });
});
