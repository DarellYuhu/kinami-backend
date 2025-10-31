import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { NewsMetadata } from './entities/news.entity';
import { firstValueFrom } from 'rxjs';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KnowledgeBase } from 'src/knowledge-base/entities/knowledge-base.entity';
import { Pipeline } from 'src/knowledge-base/entities/pipeline.entity';
import { Source } from 'src/source/entities/source.entity';
import { SourceType } from 'types';
import { AxiosRequestConfig, isAxiosError } from 'axios';

@Injectable()
export class NewsService {
  private logger = new Logger(NewsService.name);
  constructor(
    private http: HttpService,
    @InjectModel(KnowledgeBase.name)
    private knowledgeBaseModel: Model<KnowledgeBase>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async getArticleList(baseURL: string) {
    const { data } = await firstValueFrom(
      this.http.get<NewsMetadata[]>('/pavid/en/api/page/list?page=0', {
        baseURL,
      }),
    );
    return data;
  }

  async getArticle(id: string, baseURL: string) {
    const { data } = await firstValueFrom(
      this.http.get<string>(`/pavid/en/api/page/p/${id}`, { baseURL }),
    );
    return data;
  }

  @Cron(CronExpression.EVERY_SECOND, { name: 'news-scheduler' })
  async scheduler() {
    if (process.env.NODE_ENV === 'development')
      this.schedulerRegistry.deleteCronJob('news-scheduler');
    const knowledgeBase: (Pipeline & { source: Source })[] =
      await this.knowledgeBaseModel.aggregate([
        { $unwind: '$pipelines' },
        {
          $lookup: {
            from: 'sources',
            foreignField: '_id',
            localField: 'pipelines.source',
            as: 'temp',
          },
        },
        { $addFields: { 'pipelines.source': { $arrayElemAt: ['$temp', 0] } } },
        { $project: { temp: 0 } },
        { $replaceRoot: { newRoot: '$pipelines' } },
        { $match: { 'source.type': SourceType.news } },
      ]);
    const articles = await Promise.allSettled(
      knowledgeBase.map(async (item) => {
        try {
          const articleList = await this.getArticleList(item.baseUrl);
          const articles = (
            await Promise.allSettled(
              articleList.map(async (meta) => {
                const article = await this.getArticle(meta.id, item.baseUrl);
                return { ...meta, article };
              }),
            )
          )
            .filter((item) => item.status === 'fulfilled')
            .map((item) => item.value);
          return articles;
        } catch (error) {
          if (isAxiosError(error)) {
            this.logger.error(`Request fail from: ${error.request}`);
          }
        }
      }),
    );
    console.log(articles);
  }
}
