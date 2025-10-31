import { Controller, Post, Body, Param } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service';
import { CreateKnowledgeBaseDto } from './dto/create-knowledge-base.dto';
import { AddPIpelineDto } from './dto/add-pipeline.dto';

@Controller('knowledge-bases')
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Post()
  create(@Body() payload: CreateKnowledgeBaseDto) {
    return this.knowledgeBaseService.create(payload);
  }

  @Post(':id/pipelines')
  addPipeline(@Param('id') id: string, @Body() payload: AddPIpelineDto) {
    return this.knowledgeBaseService.addPipeline(id, payload);
  }
}
