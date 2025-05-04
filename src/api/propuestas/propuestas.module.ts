import { Module } from '@nestjs/common';
import { PropuestasController } from './propuestas.controller';
import { PropuestasService } from './propuestas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propuesta } from './entities/propuesta.entity';
import { PropuestaPermissionGuard } from '../auth/guards/propuesta-permission.guard';
import { CandidatosModule } from '../candidatos/candidatos.module';

@Module({
  imports: [CandidatosModule ,TypeOrmModule.forFeature([Propuesta])],
  controllers: [PropuestasController],
  providers: [PropuestasService, PropuestaPermissionGuard]
})
export class PropuestasModule {}
