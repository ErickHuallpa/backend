import { Module } from '@nestjs/common';
import { CandidatosController } from './candidatos.controller';
import { CandidatosService } from './candidatos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidato } from './entities/candidatos.entity';
import { CandidatosGateway } from './candidatos.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Candidato])],
  controllers: [CandidatosController],
  providers: [CandidatosService, CandidatosGateway],
  exports: [CandidatosService, CandidatosGateway]
})
export class CandidatosModule {}
