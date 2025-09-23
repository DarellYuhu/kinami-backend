import { Controller } from '@nestjs/common';
import { KikuService } from './kiku.service';

@Controller('kiku')
export class KikuController {
  constructor(private readonly kikuService: KikuService) {}
}
