import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
  ) {}

  create(dto: CreatePersonaDto) {
    const persona = this.personaRepo.create({
      ...dto,
      yaVoto: false,
    });
    return this.personaRepo.save(persona);
  }
  
  findAll() {
    return this.personaRepo.find();
  }

  async findOne(id: string) {
    const persona = await this.personaRepo.findOne({ where: { _id: id as any } });
    if (!persona) throw new NotFoundException('Persona no encontrada');
    return persona;
  }

  async findByCedula(cedula: string) {
    const persona = await this.personaRepo.findOne({ where: { cedulaIdentidad: cedula } });
    if (!persona) throw new NotFoundException('Persona con cédula no encontrada');
    return persona;
  }
  

  async update(id: string, dto: UpdatePersonaDto) {
    const persona = await this.findOne(id);
    Object.assign(persona, dto);
    return this.personaRepo.save(persona);
  }

  async remove(id: string) {
    const persona = await this.findOne(id);
    return this.personaRepo.remove(persona);
  }
}
