import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PipelineType } from './pipeline-type.entity';

@Schema()
export class KnowledgeBase {
  @Prop()
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PipelineType.name })
  type: mongoose.Types.ObjectId[];
}

export type KnowledgeBaseDocument = HydratedDocument<KnowledgeBase>;
export const KnowledgeBaseSchema = SchemaFactory.createForClass(KnowledgeBase);
