import { IsString, IsNumber } from 'class-validator';

export class CreateCandidatoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  edad: number;

  @IsString()
  cargo: string;

  @IsString()
  partidoId: string;
}
