import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Propuesta } from './entities/propuesta.entity';
import { CreatePropuestaDto } from './dto/create-propuesta.dto';
import { UpdatePropuestaDto } from './dto/update-propuesta.dto';

@Injectable()
export class PropuestasService {
  constructor(
    @InjectRepository(Propuesta)
    private propuestaRepo: Repository<Propuesta>,
  ) {}

  create(createDto: CreatePropuestaDto) {
    const propuesta = this.propuestaRepo.create(createDto);
    return this.propuestaRepo.save(propuesta);
  }

  findAll() {
    return this.propuestaRepo.find();
  }

  findOne(id: string) {
    return this.propuestaRepo.findOne({ where: { id: new ObjectId(id) } });
  }
  
  async update(id: string, updateDto: UpdatePropuestaDto) {
    const propuesta = await this.propuestaRepo.findOne({ where: { id: new ObjectId(id) } });
    if (!propuesta) throw new NotFoundException('Propuesta no encontrada');
    Object.assign(propuesta, updateDto);
    return this.propuestaRepo.save(propuesta);
  }
  
  async remove(id: string) {
    const propuesta = await this.propuestaRepo.findOne({ where: { id: new ObjectId(id) } });
    if (!propuesta) throw new NotFoundException('Propuesta no encontrada');
    return this.propuestaRepo.remove(propuesta);
  }  
}
