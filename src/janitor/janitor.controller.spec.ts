jhjkhădwadădawdawdawdimport { Test, TestingModule } from '@nestjs/testing';
import { JanitorController } from './janitor.controller';
import { JanitorService } from './janitor.service';

describe('JanitorController', () => {
  let controller: JanitorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JanitorController],
      providers: [JanitorService],
    }).compile();

    controller = module.get<JanitorController>(JanitorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
