import { Test, TestingModule } from '@nestjs/testing';
import { PartidoPoliticoController } from './partido-politico.controller';

describe('PartidoPoliticoController', () => {
  let controller: PartidoPoliticoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartidoPoliticoController],
    }).compile();

    controller = module.get<PartidoPoliticoController>(PartidoPoliticoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
