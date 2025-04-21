import { Module } from '@nestjs/common';
import { GaleriaController } from './galeria.controller';
import { GaleriaService } from './galeria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Imagen])],
  controllers: [GaleriaController],
  providers: [GaleriaService]
})
export class GaleriaModule {}
