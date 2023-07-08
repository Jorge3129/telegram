import { Test, TestingModule } from '@nestjs/testing';
import { MessageMapperService } from './message-mapper.service';

describe('MessageMapperService', () => {
  let service: MessageMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageMapperService],
    }).compile();

    service = module.get<MessageMapperService>(MessageMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
