import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Task Description' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'Pending',
    enum: ['Pending', 'In Progress', 'Completed'],
  })
  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: string;
}

export class UpdateTaskDto {
  @ApiProperty({ example: 'Task Title' })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Task Description' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'Pending',
    enum: ['Pending', 'In Progress', 'Completed'],
  })
  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: string;
}
