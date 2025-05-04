import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  @ApiProperty({ example: 'janedoe' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'securepassword' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  role: string;

  @IsString()
  partidoId: string;
}
