import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateActividadDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fecha: string;

  @IsString()
  partidoId: string;
}
