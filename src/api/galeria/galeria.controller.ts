import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  import { GaleriaService } from './galeria.service';
  
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
  }
  