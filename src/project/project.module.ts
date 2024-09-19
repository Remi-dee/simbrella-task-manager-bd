import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './project.schema';
import { AuthModule } from 'src/auth/auth.module';
// Import AuthModule for user authentication

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    AuthModule, // Ensure AuthModule is included for the JWT auth guard
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
