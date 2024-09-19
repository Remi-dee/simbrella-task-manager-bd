import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ description: 'Name of the team' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID of the project this team belongs to' })
  @IsNotEmpty()
  @IsString()
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
