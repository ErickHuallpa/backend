import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { ObjectId } from 'mongodb';
import { Candidato } from './entities/candidatos.entity';

@Injectable()
export class CandidatosService {
  constructor(
    @InjectRepository(Candidato)
    private readonly candidatoRepo: Repository<Candidato>,
  ) {}

  async create(dto: CreateCandidatoDto) {
    const candidato = this.candidatoRepo.create({
      ...dto,
      votos: 0,
      foto: dto.foto || ''
    });
    return this.candidatoRepo.save(candidato);
  }
  
  findAll() {
    return this.candidatoRepo.find();
  }

  async findOne(id: string) {
    const candidato = await this.candidatoRepo.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!candidato) throw new NotFoundException('Candidato no encontrado');
    return candidato;
  }

  async update(id: string, dto: UpdateCandidatoDto) {
    const candidato = await this.findOne(id);
    Object.assign(candidato, dto);
    return this.candidatoRepo.save(candidato);
  }
    

  async remove(id: string) {
    const candidato = await this.findOne(id);
    return this.candidatoRepo.remove(candidato);
  }
}
