import { Test, TestingModule } from '@nestjs/testing';
import { PartidoPoliticoService } from './partido-politico.service';

describe('PartidoPoliticoService', () => {
  let service: PartidoPoliticoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartidoPoliticoService],
    }).compile();

    service = module.get<PartidoPoliticoService>(PartidoPoliticoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
