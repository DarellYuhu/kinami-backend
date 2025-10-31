import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';
import { HttpModule } from '@nestjs/axios';
import { KikuModule } from './kiku/kiku.module';
import { SourceModule } from './source/source.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { ScheduleModule } from '@nestjs/schedule';
import { PipelineModule } from './pipeline/pipeline.module';

@Module({
  imports: [
    KnowledgeBaseModule,
    NewsModule,
    KikuModule,
    SourceModule,
    ScheduleModule.forRoot(),
    AuthModule.forRoot(auth),
    HttpModule.register({ timeout: 10000 }),
    MongooseModule.forRoot(process.env.MONGO_URI || '', {
      auth: {
        username: process.env.MONGO_INITDB_ROOT_USERNAME,
        password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      },
      authSource: 'admin',
    }),
    PipelineModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
