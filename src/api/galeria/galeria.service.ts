// src/galeria/galeria.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from './entities/imagen.entity';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { ObjectId } from 'mongodb';  // Importar ObjectId

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

  findByPartidoId(partidoId: string) {
    return this.galeriaRepo.find({ where: { partidoId } });
  }

  async findOne(id: string) {
    const objectId = new ObjectId(id);
    const imagen = await this.galeriaRepo.findOne({ where: { _id: objectId } });
    if (!imagen) {
      throw new NotFoundException('Imagen no encontrada');
    }
    return imagen;
  }

  async update(id: string, updateImagenDto: UpdateImagenDto) {
    const imagen = await this.findOne(id);
    Object.assign(imagen, updateImagenDto);
    return this.galeriaRepo.save(imagen);
  }

  async remove(id: string) {
    const imagen = await this.findOne(id);
    return this.galeriaRepo.remove(imagen);
  }
}
