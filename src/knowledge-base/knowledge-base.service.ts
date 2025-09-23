import { Injectable } from '@nestjs/common';
import { CreateKnowledgeBaseDto } from './dto/create-knowledge-base.dto';
import { UpdateKnowledgeBaseDto } from './dto/update-knowledge-base.dto';
import { KnowledgeBase } from './entities/knowledge-base.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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

  findAll() {
    return `This action returns all knowledgeBase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} knowledgeBase`;
  }

  update(id: number, updateKnowledgeBaseDto: UpdateKnowledgeBaseDto) {
    return `This action updates a #${id} knowledgeBase`;
  }

  remove(id: number) {
    return `This action removes a #${id} knowledgeBase`;
  }
}
