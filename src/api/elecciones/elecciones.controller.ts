import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { EleccionesService } from './elecciones.service';
import { CreateEleccionDto } from './dto/create-eleccion.dto';
import { UpdateEleccionDto } from './dto/update-eleccion.dto';

@Controller('elecciones')
export class EleccionesController {
  constructor(private readonly eleccionesService: EleccionesService) {}

  @Post()
  create(@Body() dto: CreateEleccionDto) {
    return this.eleccionesService.create(dto);
  }

  @Get()
  findAll() {
    return this.eleccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eleccionesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEleccionDto) {
    return this.eleccionesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eleccionesService.remove(id);
  }
}
