import { Test, TestingModule } from '@nestjs/testing';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';

describe('MoodController', () => {
  let controller: MoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodController],
      providers: [MoodService],
    }).compile();

    controller = module.get<MoodController>(MoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
