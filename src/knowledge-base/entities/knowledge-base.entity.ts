import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Pipeline, PipelineSchema } from './pipeline.entity';

@Schema()
export class KnowledgeBase {
  @Prop()
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop([PipelineSchema])
  pipelines: Pipeline[];
}

export type KnowledgeBaseDocument = HydratedDocument<KnowledgeBase>;
export const KnowledgeBaseSchema = SchemaFactory.createForClass(KnowledgeBase);
