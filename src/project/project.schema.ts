import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Team', default: [] })
  teams: Types.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
