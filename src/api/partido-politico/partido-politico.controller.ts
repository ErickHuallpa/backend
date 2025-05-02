import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { PartidoPolitico } from './entities/partido-politico.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreatePartidoPoliticoDto } from './dto/create-partido-politico.dto';
import { UpdatePartidoPoliticoDto } from './dto/update-partido-politico.dto';
import { PartidoPoliticoService } from './partido-politico.service';

@Controller('partido-politico')
export class PartidoPoliticoController {
  constructor(private readonly partidoService: PartidoPoliticoService) {}

  @Post()
  async create(@Body() createPartidoDto: CreatePartidoPoliticoDto): Promise<PartidoPolitico> {
    return this.partidoService.create(createPartidoDto);
  }

  @Get('search') // <-- Esta es la ruta importante
  async search(@Query('term') term: string): Promise<PartidoPolitico[]> {
    return this.partidoService.search(term);
  }
  

  @Get()
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  async findAll(): Promise<PartidoPolitico[]> {
    return this.partidoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PartidoPolitico> {
    try {
      return await this.partidoService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('ID inválido');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePartidoDto: UpdatePartidoPoliticoDto,
  ): Promise<PartidoPolitico> {
    return this.partidoService.update(id, updatePartidoDto);
  }


  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.partidoService.remove(id);
  }
}
