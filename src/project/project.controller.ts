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
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Projects')
@ApiBearerAuth('Authorization')
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check input data.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, user not logged in.',
  })
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'List of projects fetched successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, user not logged in.',
  })
  getProjects() {
    return this.projectService.getProjects();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by its ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the project to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The project was retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found.',
  })
  getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing project' })
  @ApiParam({
    name: 'id',
    description: 'ID of the project to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found.',
  })
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({
    name: 'id',
    description: 'ID of the project to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Project not found.',
  })
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
