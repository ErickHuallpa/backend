import { IsString } from 'class-validator';

export class CreatePropuestaDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsString()
  candidatoId: string;
}
