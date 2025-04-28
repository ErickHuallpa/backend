import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Eleccion } from './entities/eleccion.entity';
import { CreateEleccionDto } from './dto/create-eleccion.dto';
import { UpdateEleccionDto } from './dto/update-eleccion.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class EleccionesService {
  constructor(
    @InjectRepository(Eleccion)
    private readonly eleccionRepo: Repository<Eleccion>,
  ) {}

  async create(dto: CreateEleccionDto) {
    const eleccion = this.eleccionRepo.create({
      fechaInicio: new Date(dto.fechaInicio),
      horaInicio: dto.horaInicio,
      fechaFin: new Date(dto.fechaFin),
    });
    return this.eleccionRepo.save(eleccion);
  }

  findAll() {
    return this.eleccionRepo.find();
  }

  async findOne(id: string) {
    const eleccion = await this.eleccionRepo.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!eleccion) throw new NotFoundException('Elección no encontrada');
    return eleccion;
  }

  async update(id: string, dto: UpdateEleccionDto) {
    const eleccion = await this.findOne(id);
    Object.assign(eleccion, {
      ...dto,
      fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : eleccion.fechaInicio,
      fechaFin: dto.fechaFin ? new Date(dto.fechaFin) : eleccion.fechaFin,
    });
    return this.eleccionRepo.save(eleccion);
  }

  async remove(id: string) {
    const eleccion = await this.findOne(id);
    return this.eleccionRepo.remove(eleccion);
  }
}
