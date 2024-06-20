import { Test, TestingModule } from '@nestjs/testing';
import { JanitorService } from './janitor.service';

describe('JanitorService', () => {
  let service: JanitorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JanitorService],
    }).compile();

    service = module.get<JanitorService>(JanitorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
