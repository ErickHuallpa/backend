import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voto } from './entities/voto.entity';
import { CreateVotoDto } from './dto/create-voto.dto';
import { Candidato } from '../candidatos/entities/candidatos.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class VotosService {
  constructor(
    @InjectRepository(Voto)
    private readonly votoRepo: Repository<Voto>,
    @InjectRepository(Candidato)
    private readonly candidatoRepo: Repository<Candidato>,
  ) {}

  private cedulasVotantes: Set<string> = new Set();

  async votar(dto: CreateVotoDto) {
    if (this.cedulasVotantes.has(dto.cedulaIdentidad)) {
      throw new BadRequestException('Esta cédula ya ha votado.');
    }

    const voto = this.votoRepo.create({
      presidenteViceId: dto.presidenteViceId,
      gobernadorId: dto.gobernadorId,
    });

    await this.incrementarVotos(new ObjectId(dto.presidenteViceId));
    await this.incrementarVotos(new ObjectId(dto.gobernadorId));

    this.cedulasVotantes.add(dto.cedulaIdentidad);
    return this.votoRepo.save(voto);
  }

  private async incrementarVotos(candidatoId: ObjectId) {
    const candidato = await this.candidatoRepo.findOne({ where: { _id: candidatoId } });
    if (!candidato) {
      throw new BadRequestException('Candidato no encontrado');
    }
    candidato.votos += 1;
    await this.candidatoRepo.save(candidato);
  }

  findAll() {
    return this.votoRepo.find();
  }
}
