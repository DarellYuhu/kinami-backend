import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Source } from 'src/source/entities/source.entity';

@Schema()
export class Pipeline {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  baseUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Source.name })
  source: mongoose.Types.ObjectId;

  @Prop({ type: [String] })
  keywords: string[];
}

export type PipelineDocument = HydratedDocument<Pipeline>;
export const PipelineSchema = SchemaFactory.createForClass(Pipeline);
