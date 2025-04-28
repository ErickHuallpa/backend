import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EleccionesController } from './elecciones.controller';
import { EleccionesService } from './elecciones.service';
import { Eleccion } from './entities/eleccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Eleccion])],
  controllers: [EleccionesController],
  providers: [EleccionesService],
})
export class EleccionesModule {}
