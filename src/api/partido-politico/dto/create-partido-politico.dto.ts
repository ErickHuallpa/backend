import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreatePartidoPoliticoDto {
  @ApiProperty({ example: 'Partido Ejemplo' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  nombre: string;

  @ApiProperty({ example: 'Un partido político de ejemplo.' })
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  descripcion: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @IsDateString()
  fundacion: Date;

  @ApiProperty({ example: 'http://example.com/logo.png' })
  @IsUrl()
  logoUrl: string;

  @ApiProperty({ example: 'PE' })
  @IsString()
  @MinLength(2)
  @MaxLength(5)
  siglas: string;
}
