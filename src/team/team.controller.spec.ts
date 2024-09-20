import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { CreateTeamDto, AddUserDto, UpdateTeamDto } from './team.dto';

describe('TeamController', () => {
  let controller: TeamController;
  let teamService: TeamService;

  const mockTeamService = {
    createTeam: jest.fn(),
    addUserToTeam: jest.fn(),
    getTeamsByProject: jest.fn(),
    updateTeam: jest.fn(),
    deleteTeam: jest.fn(),
    removeUserFromTeam: jest.fn(),
    getAllTeams: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: mockTeamService,
        },
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    teamService = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTeam', () => {
    it('should call teamService.createTeam with correct parameters', async () => {
      const createTeamDto: CreateTeamDto = { name: 'Team A', projectId: '123' };
      await controller.createTeam(createTeamDto);
      expect(teamService.createTeam).toHaveBeenCalledWith(createTeamDto);
    });
  });

  describe('addUserToTeam', () => {
    it('should call teamService.addUserToTeam with correct parameters', async () => {
      const addUserDto: AddUserDto = { userId: 'user123' };
      const teamId = 'team123';
      await controller.addUserToTeam(teamId, addUserDto);
      expect(teamService.addUserToTeam).toHaveBeenCalledWith(
        teamId,
        addUserDto,
      );
    });
  });

  describe('getTeamsByProject', () => {
    it('should call teamService.getTeamsByProject with correct projectId', async () => {
      const projectId = 'project123';
      await controller.getTeamsByProject(projectId);
      expect(teamService.getTeamsByProject).toHaveBeenCalledWith(projectId);
    });
  });

  describe('updateTeam', () => {
    it('should call teamService.updateTeam with correct parameters', async () => {
      const updateTeamDto: UpdateTeamDto = { name: 'Updated Team' };
      const teamId = 'team123';
      await controller.updateTeam(teamId, updateTeamDto);
      expect(teamService.updateTeam).toHaveBeenCalledWith(
        teamId,
        updateTeamDto,
      );
    });
  });

  describe('deleteTeam', () => {
    it('should call teamService.deleteTeam with correct teamId', async () => {
      const teamId = 'team123';
      await controller.deleteTeam(teamId);
      expect(teamService.deleteTeam).toHaveBeenCalledWith(teamId);
    });
  });

  describe('removeUserFromTeam', () => {
    it('should call teamService.removeUserFromTeam with correct teamId and userId', async () => {
      const teamId = 'team123';
      const userId = 'user123';
      await controller.removeUserFromTeam(teamId, userId);
      expect(teamService.removeUserFromTeam).toHaveBeenCalledWith(
        teamId,
        userId,
      );
    });
  });

  describe('getAllTeams', () => {
    it('should call teamService.getAllTeams', async () => {
      await controller.getAllTeams();
      expect(teamService.getAllTeams).toHaveBeenCalled();
    });
  });
});
