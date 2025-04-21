import { IsString, IsDateString } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  cedulaIdentidad: string;

  @IsString()
  ciudad: string;

  @IsDateString()
  fechaNacimiento: string;
}
