import { Test, TestingModule } from '@nestjs/testing';
import { KikuController } from './kiku.controller';
import { KikuService } from './kiku.service';

describe('KikuController', () => {
  let controller: KikuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KikuController],
      providers: [KikuService],
    }).compile();

    controller = module.get<KikuController>(KikuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
