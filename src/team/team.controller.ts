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

import { CreateTeamDto, AddUserDto, UpdateTeamDto } from './team.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TeamService } from './team.service';

@ApiTags('Teams')
@ApiBearerAuth('Authorization')
@Controller('teams')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiResponse({
    status: 201,
    description: 'The team has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, user not logged in.',
  })
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  @Post(':id/users')
  @ApiOperation({ summary: 'Add a user to a team' })
  @ApiParam({ name: 'id', description: 'ID of the team', type: String })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully added to the team.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check input data.',
  })
  addUserToTeam(@Param('id') teamId: string, @Body() addUserDto: AddUserDto) {
    return this.teamService.addUserToTeam(teamId, addUserDto);
  }

  @Get(':projectId')
  @ApiOperation({ summary: 'Get teams for a specific project' })
  @ApiParam({
    name: 'projectId',
    description: 'ID of the project',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of teams fetched successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, user not logged in.',
  })
  getTeamsByProject(@Param('projectId') projectId: string) {
    return this.teamService.getTeamsByProject(projectId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a team' })
  @ApiParam({
    name: 'id',
    description: 'ID of the team to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully updated.',
  })
  updateTeam(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.updateTeam(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team' })
  @ApiParam({
    name: 'id',
    description: 'ID of the team to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The team has been successfully deleted.',
  })
  deleteTeam(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }

  @Delete(':id/users/:userId')
  @ApiOperation({ summary: 'Remove a user from a team' })
  @ApiParam({ name: 'id', description: 'ID of the team', type: String })
  @ApiParam({
    name: 'userId',
    description: 'ID of the user to remove',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully removed from the team.',
  })
  removeUserFromTeam(
    @Param('id') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.teamService.removeUserFromTeam(teamId, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({
    status: 200,
    description: 'List of all teams fetched successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, user not logged in.',
  })
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  @Delete('all')
  @ApiOperation({ summary: 'Delete all teams' })
  @ApiResponse({
    status: 200,
    description: 'All teams have been successfully deleted.',
  })
  deleteAllTeams() {
    return this.teamService.deleteAllTeams();
  }

  @Get()
  async dropIndex(): Promise<string> {
    await this.teamService.dropTeamIdIndex();
    return 'Index dropped successfully';
  }
}
