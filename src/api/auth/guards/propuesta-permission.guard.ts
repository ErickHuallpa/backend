import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { PropuestasService } from 'src/api/propuestas/propuestas.service';
  import { CandidatosService } from 'src/api/candidatos/candidatos.service';
  
  @Injectable()
  export class PropuestaPermissionGuard implements CanActivate {
    constructor(
      private readonly propuestasService: PropuestasService,
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
      const propuestaId = request.params.id;
      if (!propuestaId) {
        throw new ForbiddenException('ID de propuesta no proporcionado');
      }
      const propuesta = await this.propuestasService.findOne(propuestaId);
      if (!propuesta) {
        throw new ForbiddenException('Propuesta no encontrada');
      }
      const candidato = await this.candidatosService.findOne(propuesta.candidatoId);
      if (!candidato) {
        throw new ForbiddenException('Candidato asociado no encontrado');
      }
        if (candidato.partidoId !== user.partidoId) {
        throw new ForbiddenException('No tiene permiso para editar esta propuesta');
      }
      return true;
    }
  }
  