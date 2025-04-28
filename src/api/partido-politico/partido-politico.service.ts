import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartidoPolitico } from './entities/partido-politico.entity';
import { ObjectId } from 'mongodb';
import { CreatePartidoPoliticoDto } from './dto/create-partido-politico.dto';
import { UpdatePartidoPoliticoDto } from './dto/update-partido-politico.dto';

@Injectable()
export class PartidoPoliticoService {
  constructor(
    @InjectRepository(PartidoPolitico)
    private partidoRepository: Repository<PartidoPolitico>,
  ) {}

  async create(partidoDto: CreatePartidoPoliticoDto): Promise<PartidoPolitico> {
    const newPartido = this.partidoRepository.create(partidoDto);
    return this.partidoRepository.save(newPartido);
  }

  async findAll(): Promise<PartidoPolitico[]> {
    return this.partidoRepository.find();
  }

  async findOne(id: string): Promise<PartidoPolitico> {
    const partido = await this.partidoRepository.findOne({ where: { _id: new ObjectId(id) } });  // Convertir id a ObjectId
    if (!partido) {
      throw new NotFoundException(`Partido Politico con ID ${id} no encontrado`);
    }
    return partido;
  }

  async update(id: string, partidoDto: UpdatePartidoPoliticoDto): Promise<PartidoPolitico> {
    const existingPartido = await this.findOne(id);
    const updatedPartido = Object.assign(existingPartido, partidoDto);
    return this.partidoRepository.save(updatedPartido);
  }

  async remove(id: string): Promise<void> {
    const partido = await this.findOne(id);
    await this.partidoRepository.remove(partido);
  }
}
