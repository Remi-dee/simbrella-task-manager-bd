import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectDto } from './team.dto';
import { timestamp } from 'rxjs';

@Schema({ timestamps: true })
export class Team extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  projectId: string;

  @Prop({ type: [String], default: [] })
  members: string[];

  @Prop({ required: false })
  project: ProjectDto;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
