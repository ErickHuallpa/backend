import { Module } from '@nestjs/common';
import { PropuestasController } from './propuestas.controller';
import { PropuestasService } from './propuestas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propuesta } from './entities/propuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Propuesta])],
  controllers: [PropuestasController],
  providers: [PropuestasService]
})
export class PropuestasModule {}
