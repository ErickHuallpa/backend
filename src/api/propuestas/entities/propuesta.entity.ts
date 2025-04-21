import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Propuesta {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  partidoId: string;
}
