import { Module } from '@nestjs/common';
import { KikuService } from './kiku.service';
import { KikuController } from './kiku.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [KikuController],
  providers: [KikuService],
})
export class KikuModule {}
