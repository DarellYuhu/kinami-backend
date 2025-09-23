import { Module } from '@nestjs/common';
import { KikuService } from './kiku.service';
import { KikuController } from './kiku.controller';

@Module({
  controllers: [KikuController],
  providers: [KikuService],
})
export class KikuModule {}
