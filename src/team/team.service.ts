import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto, AddUserDto, UpdateTeamDto } from './team.dto';
import { Team } from './team.schema';
// Assuming you have a Team model defined

@Injectable()
export class TeamService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async addUserToTeam(teamId: string, addUserDto: AddUserDto) {
    const team = await this.teamModel.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    if (team.members.includes(addUserDto.userId)) {
      throw new BadRequestException('User is already a member of the team');
    }
    team.members.push(addUserDto.userId);
    return team.save();
  }

  async updateTeam(id: string, updateTeamDto: UpdateTeamDto) {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(
      id,
      updateTeamDto,
      { new: true },
    );
    if (!updatedTeam) {
      throw new NotFoundException('Team not found');
    }
    return updatedTeam;
  }

  async deleteTeam(id: string) {
    const result = await this.teamModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Team not found');
    }
    return { message: 'Team deleted successfully' };
  }

  async removeUserFromTeam(teamId: string, userId: string) {
    const team = await this.teamModel.findById(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    team.members = team.members.filter((member) => member !== userId);
    await team.save();
    return { message: 'User removed from team successfully' };
  }

  async getTeamsByProject(projectId: string) {
    return this.teamModel
      .find({ projectId })
      .populate('members', 'username')
      .populate('project', 'name')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getAllTeams() {
    return this.teamModel
      .find()
      .populate('members', 'username')
      .populate('project', 'name')
      .sort({ createdAt: -1 })
      .exec();
  }

  async deleteAllTeams() {
    const result = await this.teamModel.deleteMany({}); // Deletes all teams
    return {
      message: 'All teams deleted successfully',
      deletedCount: result.deletedCount,
    };
  }

  async dropTeamIdIndex(): Promise<void> {
    try {
      await this.teamModel.collection.dropIndex('_id');
    } catch (error) {}
  }
}
