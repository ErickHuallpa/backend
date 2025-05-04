import {CanActivate,ExecutionContext,Injectable,ForbiddenException,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CandidatosService } from 'src/api/candidatos/candidatos.service';

@Injectable()
export class CandidatoPermissionGuard implements CanActivate {
  constructor(
    private readonly candidatosService: CandidatosService,
    private readonly reflector: Reflector,
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
    const candidatoId = request.params.id;
    if (!candidatoId) {
      throw new ForbiddenException('ID de candidato no proporcionado');
    }
    const candidato = await this.candidatosService.findOne(candidatoId);
    if (!candidato) {
      throw new ForbiddenException('Candidato no encontrado');
    }
    if (candidato.partidoId !== user.partidoId) {
      throw new ForbiddenException('No tiene permiso para editar este candidato');
    }
    return true;
  }
}
