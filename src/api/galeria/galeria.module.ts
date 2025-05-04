import { Module } from '@nestjs/common';
import { GaleriaController } from './galeria.controller';
import { GaleriaService } from './galeria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';
import { GaleriaPermissionGuard } from '../auth/guards/galeria-permission.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen])],
  controllers: [GaleriaController],
  providers: [GaleriaService, GaleriaPermissionGuard]
})
export class GaleriaModule {}
