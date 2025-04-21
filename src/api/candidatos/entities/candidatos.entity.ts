import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Candidato {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nombre: string;

  @Column()
  edad: number;

  @Column()
  cargo: string;

  @Column()
  partidoId: string;
  
  @Column({ default: 0 })
  votos: number;

  @Column({ nullable: true })
  foto?: string;
}
