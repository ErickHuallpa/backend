import { IsString, IsOptional } from 'class-validator';

export class UpdateImagenDto {
  @IsOptional()
  @IsString()
  readonly filename?: string;

  @IsOptional()
  @IsString()
  readonly path?: string;

  @IsOptional()
  @IsString()
  readonly partidoId?: string;
}