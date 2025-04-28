import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voto } from './entities/voto.entity';
import { CreateVotoDto } from './dto/create-voto.dto';
import { Candidato } from '../candidatos/entities/candidatos.entity';
import { ObjectId } from 'mongodb';
import { Eleccion } from '../elecciones/entities/eleccion.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class VotosService {
  constructor(
    @InjectRepository(Voto)
    private readonly votoRepo: Repository<Voto>,
    @InjectRepository(Candidato)
    private readonly candidatoRepo: Repository<Candidato>,
    @InjectRepository(Eleccion)
    private readonly eleccionRepo: Repository<Eleccion>,
  ) {}

  private cedulasVotantes: Set<string> = new Set();

  async votar(dto: CreateVotoDto) {
    await this.validarDiaDeEleccion();

    if (this.cedulasVotantes.has(dto.cedulaIdentidad)) {
      throw new BadRequestException('Esta cédula ya ha votado.');
    }
    const fechaVotoLocal = moment().tz('America/La_Paz').format();

    const voto = this.votoRepo.create({
      presidenteViceId: dto.presidenteViceId,
      gobernadorId: dto.gobernadorId,
      fechaVoto: fechaVotoLocal,
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

  private async validarDiaDeEleccion() {
    const elecciones = await this.eleccionRepo.find();
    if (elecciones.length === 0) {
      throw new BadRequestException('No hay elecciones registradas.');
    }

    const hoy = new Date();
    const hoyFecha = hoy.toISOString().split('T')[0];

    const hayEleccionHoy = elecciones.some(eleccion => {
      const fechaInicio = new Date(eleccion.fechaInicio).toISOString().split('T')[0];
      const fechaFin = new Date(eleccion.fechaFin).toISOString().split('T')[0];
      return hoyFecha >= fechaInicio && hoyFecha <= fechaFin;
    });

    if (!hayEleccionHoy) {
      throw new BadRequestException('No hay día de elecciones hoy.');
    }
  }
}
