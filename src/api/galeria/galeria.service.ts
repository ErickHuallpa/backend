import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from './entities/imagen.entity';

@Injectable()
export class GaleriaService {
  constructor(
    @InjectRepository(Imagen)
    private readonly galeriaRepo: Repository<Imagen>,
  ) {}

  async saveImage(file: Express.Multer.File, partidoId: string) {
    const imagen = this.galeriaRepo.create({
      filename: file.filename,
      path: file.path,
      partidoId,
    });
    return this.galeriaRepo.save(imagen);
  }

  findAll() {
    return this.galeriaRepo.find();
  }
}
