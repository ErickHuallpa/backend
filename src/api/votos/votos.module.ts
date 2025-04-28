import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotosService } from './votos.service';
import { VotosController } from './votos.controller';
import { Voto } from './entities/voto.entity';
import { Candidato } from '../candidatos/entities/candidatos.entity';
import { Eleccion } from '../elecciones/entities/eleccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voto, Candidato, Eleccion])],
  controllers: [VotosController],
  providers: [VotosService],
})
export class VotosModule {}
