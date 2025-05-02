import { Controller, Post, Get, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PropuestasService } from './propuestas.service';
import { CreatePropuestaDto } from './dto/create-propuesta.dto';
import { UpdatePropuestaDto } from './dto/update-propuesta.dto';

@Controller('propuestas')
export class PropuestasController {
  constructor(private readonly propuestasService: PropuestasService) {}

  @Post()
  create(@Body() createDto: CreatePropuestaDto) {
    return this.propuestasService.create(createDto);
  }

  @Get()
  findAll(@Query('candidatoId') candidatoId?: string) {
    if (candidatoId) {
      return this.propuestasService.findByCandidatoId(candidatoId);
    }
    return this.propuestasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propuestasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePropuestaDto) {
    return this.propuestasService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propuestasService.remove(id);
  }
}
