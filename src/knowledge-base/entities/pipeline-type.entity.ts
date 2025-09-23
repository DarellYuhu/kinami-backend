import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class PipelineType {
  @Prop()
  name: string;

  @Prop()
  description?: string;
}

export type PipelineTypeDocument = HydratedDocument<PipelineType>;
export const PipelineTypeSchema = SchemaFactory.createForClass(PipelineType);
