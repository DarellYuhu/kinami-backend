import { Controller } from '@nestjs/common';
import { PavidService } from './pavid.service';

@Controller('pavid')
export class PavidController {
  constructor(private readonly pavidService: PavidService) {}
}
