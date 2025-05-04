import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActividadPermissionGuard } from '../auth/guards/actividad-permission.guard';

@Controller('cronograma')
export class CronogramaController {
  constructor(private readonly cronogramaService: CronogramaService) {}

  @Post()
  create(@Body() dto: CreateActividadDto) {
    return this.cronogramaService.create(dto);
  }

  @Get()
  findAll(@Query('candidatoId') candidatoId?: string) {
    if (candidatoId) {
      return this.cronogramaService.findByCandidatoId(candidatoId);
    }
    return this.cronogramaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cronogramaService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, ActividadPermissionGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateActividadDto) {
    const actividad = await this.cronogramaService.findOne(id);
    if (!actividad) throw new NotFoundException('Actividad no encontrada');
    return this.cronogramaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cronogramaService.remove(id);
  }
}
