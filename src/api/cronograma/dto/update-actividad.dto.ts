import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadDto } from './create-actividad.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateActividadDto extends PartialType(CreateActividadDto) {
  @IsOptional()
  @IsString()
  estado?: 'pendiente' | 'en_progreso' | 'completado';
}
