import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Propuesta {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  candidatoId: string;
}
