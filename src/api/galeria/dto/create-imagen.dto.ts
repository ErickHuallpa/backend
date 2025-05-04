import { IsString } from 'class-validator';

export class CreateImagenDto {
  @IsString()
  readonly filename: string;

  @IsString()
  readonly path: string;

  @IsString()
  readonly partidoId: string;
}