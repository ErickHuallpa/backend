// src/galeria/galeria.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GaleriaService } from './galeria.service';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GaleriaPermissionGuard } from '../auth/guards/galeria-permission.guard';

@Controller('galeria')
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('partidoId') partidoId: string,
  ) {
    return this.galeriaService.saveImage(file, partidoId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, GaleriaPermissionGuard)
  findAll() {
    return this.galeriaService.findAll();
  }

  @Get('partido/:partidoId')
  findByPartidoId(@Param('partidoId') partidoId: string) {
    return this.galeriaService.findByPartidoId(partidoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galeriaService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateImagenDto: UpdateImagenDto,
  ) {
    return this.galeriaService.update(id, updateImagenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeriaService.remove(id);
  }
}
