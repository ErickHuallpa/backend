import { Module } from '@nestjs/common';
import { CronogramaController } from './cronograma.controller';
import { CronogramaService } from './cronograma.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entities/actividad.entity';
import { CandidatosModule } from '../candidatos/candidatos.module';
import { ActividadPermissionGuard } from '../auth/guards/actividad-permission.guard';

@Module({
  imports: [CandidatosModule ,TypeOrmModule.forFeature([Actividad])],
  controllers: [CronogramaController],
  providers: [CronogramaService, ActividadPermissionGuard]
})
export class CronogramaModule {}
