import { Module } from '@nestjs/common';
import { PavidService } from './pavid.service';
import { PavidController } from './pavid.controller';

@Module({
  controllers: [PavidController],
  providers: [PavidService],
})
export class PavidModule {}
