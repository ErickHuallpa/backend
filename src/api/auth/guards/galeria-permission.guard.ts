import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
import { GaleriaService } from 'src/api/galeria/galeria.service';
  
  @Injectable()
  export class GaleriaPermissionGuard implements CanActivate {
    constructor(
      private readonly galeriaService: GaleriaService,
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
      const imagenId = request.params.id;
      if (!imagenId) {
        throw new ForbiddenException('ID de imagen no proporcionado');
      }
      const imagen = await this.galeriaService.findOne(imagenId);
      if (!imagen) {
        throw new ForbiddenException('Imagen no encontrada');
      }
        if (imagen.partidoId !== user.partidoId) {
        throw new ForbiddenException('No tiene permiso para editar esta imagen');
      }
      return true;
    }
  }
  