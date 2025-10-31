import mongoose from 'mongoose';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod/v4';

export const AddPipelineSchema = z
  .object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    baseUrl: z.string().nonempty(),
    source: z
      .string()
      .nonempty()
      .transform((val) => new mongoose.Types.ObjectId(val)),
    keywords: z.array(z.string().nonempty()).nonempty(),
  })
  .partial({ description: true });

export class AddPIpelineDto extends createZodDto(AddPipelineSchema) {}
