import { Controller, Post, Get, Patch, Delete, Body, Param, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateActividadDto } from '../cronograma/dto/create-actividad.dto';

@Controller('candidatos')
export class CandidatosController {
  constructor(private readonly candidatosService: CandidatosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto', {
    storage: diskStorage({
      destination: './uploads/candidatos',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
  }))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateCandidatoDto,
  ) {
    return this.candidatosService.create({
      ...dto,
      foto: file?.filename,
    });
  }

  @Get()
  findAll() {
    return this.candidatosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCandidatoDto) {
    return this.candidatosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatosService.remove(id);
  }
}
