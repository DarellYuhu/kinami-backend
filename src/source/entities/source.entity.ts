import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SourceType } from 'types';

@Schema()
export class Source {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: String, enum: SourceType, required: true })
  type: SourceType;
}

export type SourceDocument = HydratedDocument<Source>;
export const SourceSchema = SchemaFactory.createForClass(Source);
