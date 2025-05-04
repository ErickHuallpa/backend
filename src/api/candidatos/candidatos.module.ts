import { Module } from '@nestjs/common';
import { CandidatosController } from './candidatos.controller';
import { CandidatosService } from './candidatos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidato } from './entities/candidatos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidato])],
  controllers: [CandidatosController],
  providers: [CandidatosService],
  exports: [CandidatosService]
})
export class CandidatosModule {}
