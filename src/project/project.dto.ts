import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Title of the project' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the project' })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateProjectDto {
  @ApiProperty({ description: 'Title of the project', required: false })
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Description of the project', required: false })
  @IsString()
  description?: string;
}
