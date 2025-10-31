import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';
import { AddPipelineSchema } from './add-pipeline.dto';

const CreateKnowledgeBaseSchema = z
  .object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    pipelines: z.array(AddPipelineSchema),
  })
  .partial({ description: true });

export class CreateKnowledgeBaseDto extends createZodDto(
  CreateKnowledgeBaseSchema,
) {}
