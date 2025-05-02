import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    // Verifica si el ID es válido antes de convertirlo
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException(`ID de partido político inválido`);
    }
  
    const partido = await this.partidoRepository.findOne({ 
      where: { _id: new ObjectId(id) }
    });
  
    if (!partido) {
      throw new NotFoundException(`Partido político con ID ${id} no encontrado`);
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

  async search(term: string): Promise<PartidoPolitico[]> {
    if (!term || term.trim() === '') {
      return this.findAll();
    }
  
    try {
      const mongoRepository = this.partidoRepository.manager.getMongoRepository(PartidoPolitico);
      return await mongoRepository.find({
        where: {
          $or: [
            { nombre: { $regex: term, $options: 'i' } },
            { siglas: { $regex: term, $options: 'i' } }
          ]
        }
      });
    } catch (error) {
      console.error('Error en búsqueda:', error);
      throw new InternalServerErrorException('Error al realizar la búsqueda');
    }
  }
}
