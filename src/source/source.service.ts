import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { type Connection, Model } from 'mongoose';
import { Source } from './entities/source.entity';
import { SourceType } from 'types';

@Injectable()
export class SourceService implements OnApplicationBootstrap {
  private logger = new Logger(SourceService.name);
  constructor(
    @InjectModel(Source.name) private source: Model<Source>,
    @InjectConnection() private connection: Connection,
  ) {}

  onApplicationBootstrap() {
    return this.seedData();
  }

  async seedData() {
    await this.connection.withSession(async (session) => {
      session.startTransaction();
      try {
        await this.source.create(
          [
            {
              name: 'News',
              description: 'Source from news provider',
              type: SourceType.news,
            },
            {
              name: 'Transcriber',
              description: 'Source from transcriber provider',
              type: SourceType.news,
            },
          ],
          { ordered: false },
        );
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        if (error instanceof mongoose.mongo.MongoError) {
          if (error.code === 11000)
            return this.logger.warn('Source already seeded');
        }
        this.logger.error('Fail seeding source data');
      }
    });
  }
}
