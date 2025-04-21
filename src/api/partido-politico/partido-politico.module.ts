import { Module } from '@nestjs/common';
import { PartidoPoliticoService } from './partido-politico.service';
import { PartidoPoliticoController } from './partido-politico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidoPolitico } from './entities/partido-politico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartidoPolitico])] ,
  providers: [PartidoPoliticoService],
  controllers: [PartidoPoliticoController]
})
export class PartidoPoliticoModule {}
