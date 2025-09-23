import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PavidModule } from './pavid/pavid.module';
import { HttpModule } from '@nestjs/axios';
import { KikuModule } from './kiku/kiku.module';

@Module({
  imports: [
    KnowledgeBaseModule,
    PavidModule,
    HttpModule,
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    KikuModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
