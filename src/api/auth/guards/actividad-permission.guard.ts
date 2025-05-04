import {CanActivate,ExecutionContext,Injectable,ForbiddenException,} from '@nestjs/common';
import { CandidatosService } from 'src/api/candidatos/candidatos.service';
import { CronogramaService } from 'src/api/cronograma/cronograma.service';
  
  @Injectable()
  export class ActividadPermissionGuard implements CanActivate {
    constructor(
      private readonly actividadesService: CronogramaService,
      private readonly candidatosService: CandidatosService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
        if (user.role === 'admin') {
        return true;
      }
        if (user.role !== 'adminpar') {
        throw new ForbiddenException('No tiene permiso para realizar esta acción');
      }
      const actividadId = request.params.id;
      if (!actividadId) {
        throw new ForbiddenException('ID de actividad no proporcionado');
      }
      const actividad = await this.actividadesService.findOne(actividadId);
      if (!actividad) {
        throw new ForbiddenException('Actividad no encontrada');
      }
      const candidato = await this.candidatosService.findOne(actividad.candidatoId);
      if (!candidato) {
        throw new ForbiddenException('Candidato asociado no encontrado');
      }
        if (candidato.partidoId !== user.partidoId) {
        throw new ForbiddenException('No tiene permiso para editar esta actividad');
      }
      return true;
    }
  }
  