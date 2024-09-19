import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Task Title',
    description: 'The title of the task. This is a required field.',
  })
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Task Description',
    description: 'A detailed description of the task. This field is optional.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Pending',
    description:
      'The current status of the task. Can be "Pending", "In Progress", or "Completed".',
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  })
  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: string;
}

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Updated Task Title',
    description: 'The updated title of the task. This field is optional.',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Updated Task Description',
    description: 'The updated description of the task. This field is optional.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'In Progress',
    description:
      'The updated status of the task. Can be "Pending", "In Progress", or "Completed".',
    enum: ['Pending', 'In Progress', 'Completed'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: string;
}
