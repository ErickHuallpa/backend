import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Eleccion {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  fechaInicio: Date;

  @Column()
  horaInicio: string;

  @Column()
  fechaFin: Date;
}
