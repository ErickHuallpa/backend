import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCandidatoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  edad: number;

  @IsString()
  cargo: string;

  @IsString()
  partidoId: string;

  @IsOptional()
  @IsString()
  foto?: string;
}
