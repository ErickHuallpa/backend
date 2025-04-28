import { IsString, IsDateString } from 'class-validator';

export class CreateEleccionDto {
  @IsDateString()
  fechaInicio: string; // ISO string (ejemplo: "2025-05-01")

  @IsString()
  horaInicio: string; // formato libre ("08:00", "09:30", etc.)

  @IsDateString()
  fechaFin: string; // ISO string (ejemplo: "2025-05-01")
}
