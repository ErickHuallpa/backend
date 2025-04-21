import { IsString } from 'class-validator';

export class CreateVotoDto {
  @IsString()
  cedulaIdentidad: string;

  @IsString()
  presidenteViceId: string;

  @IsString()
  gobernadorId: string;
}
