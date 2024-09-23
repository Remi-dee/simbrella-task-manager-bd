import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from 'src/project/project.dto';

export class CreateTeamDto {
  @ApiProperty({ description: 'Name of the team' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'project this team belongs to' })
  @IsNotEmpty()
  project: CreateProjectDto;

  
  @ApiProperty({ description: 'ID of the project this team belongs to' })
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'Array of user IDs to be added to the team',
    required: false,
  })
  @IsArray()
  members?: string[];
}

export class AddUserDto {
  @ApiProperty({ description: 'ID of the user to add to the team' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class UpdateTeamDto {
  @ApiProperty({ description: 'Name of the team', required: false })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Array of user IDs to be updated in the team',
    required: false,
  })
  @IsArray()
  members?: string[];
}

export class ProjectDto {
  @ApiProperty({ description: 'Title of the project' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the project' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
