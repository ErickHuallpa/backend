import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from './entities/actividad.entity';
import { Repository } from 'typeorm';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { ObjectId } from 'mongodb';  // Asegúrate de importar ObjectId

@Injectable()
export class CronogramaService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepo: Repository<Actividad>,
  ) {}

  async create(dto: CreateActividadDto) {
    const actividad = this.actividadRepo.create({
      ...dto,
      estado: 'pendiente',
    });
    return this.actividadRepo.save(actividad);
  }

  findAll() {
    return this.actividadRepo.find();
  }

  async findOne(id: string) {
    const actividad = await this.actividadRepo.findOne({ where: { _id: new ObjectId(id) } });
    return actividad;
  }
  async findByCandidatoId(candidatoId: string) {
    return this.actividadRepo.find({ 
      where: { 
        candidatoId: candidatoId 
      } 
    });
  }
  
  async update(id: string, dto: UpdateActividadDto) {
    const actividad = await this.findOne(id);
    if (!actividad) throw new NotFoundException('Actividad no encontrada');
    Object.assign(actividad, dto);
    return this.actividadRepo.save(actividad);
  }

  async remove(id: string) {
    const actividad = await this.findOne(id);
    if (!actividad) throw new NotFoundException('Actividad no encontrada');
    return this.actividadRepo.remove(actividad);
  }
}
