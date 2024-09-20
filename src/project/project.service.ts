import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.schema';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    return await project.save();
  }

  async getProjects(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }


  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Project not found');
    }
  }
}
