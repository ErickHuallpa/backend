import { Controller, Post, Get, Body } from '@nestjs/common';
import { VotosService } from './votos.service';
import { CreateVotoDto } from './dto/create-voto.dto';

@Controller('votos')
export class VotosController {
  constructor(private readonly votosService: VotosService) {}

  @Post()
  votar(@Body() dto: CreateVotoDto) {
    return this.votosService.votar(dto);
  }

  @Get()
  findAll() {
    return this.votosService.findAll();
  }
}
