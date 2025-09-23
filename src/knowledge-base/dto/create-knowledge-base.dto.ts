import { createZodDto } from 'nestjs-zod';
import z from 'zod/v4';

const CreateKnowledgeBaseSchema = z
  .object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    type: z.string().nonempty(),
  })
  .partial({ description: true });

export class CreateKnowledgeBaseDto extends createZodDto(
  CreateKnowledgeBaseSchema,
) {}
