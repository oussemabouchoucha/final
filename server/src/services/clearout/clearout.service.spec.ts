import { Test, TestingModule } from '@nestjs/testing';
import { ClearoutService } from './clearout.service';

describe('ClearoutService', () => {
  let service: ClearoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClearoutService],
    }).compile();

    service = module.get<ClearoutService>(ClearoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
