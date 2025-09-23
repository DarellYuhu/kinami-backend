import { Test, TestingModule } from '@nestjs/testing';
import { KikuService } from './kiku.service';

describe('KikuService', () => {
  let service: KikuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KikuService],
    }).compile();

    service = module.get<KikuService>(KikuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
