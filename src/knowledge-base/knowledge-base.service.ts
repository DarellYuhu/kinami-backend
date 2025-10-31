import { Injectable } from '@nestjs/common';
import { CreateKnowledgeBaseDto } from './dto/create-knowledge-base.dto';
import { KnowledgeBase } from './entities/knowledge-base.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddPIpelineDto } from './dto/add-pipeline.dto';

@Injectable()
export class KnowledgeBaseService {
  constructor(
    @InjectModel(KnowledgeBase.name)
    private knowledgeBaseModel: Model<KnowledgeBase>,
  ) {}

  create(payload: CreateKnowledgeBaseDto) {
    const knowledgeBase = new this.knowledgeBaseModel(payload);
    return knowledgeBase.save();
  }

  async addPipeline(id: string, payload: AddPIpelineDto) {
    const data = await this.knowledgeBaseModel.findOneAndUpdate(
      { _id: id },
      { $push: { pipelines: payload } },
    );
    return data;
  }
}
