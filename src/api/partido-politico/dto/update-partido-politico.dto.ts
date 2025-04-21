import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdatePartidoPoliticoDto {
  @ApiProperty({ example: 'Partido Ejemplo' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  nombre?: string;

  @ApiProperty({ example: 'Un partido político de ejemplo.' })
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(200)
  descripcion?: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  fundacion?: Date;

  @ApiProperty({ example: 'http://example.com/logo.png' })
  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({ example: 'PE' })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(5)
  siglas?: string;
}
