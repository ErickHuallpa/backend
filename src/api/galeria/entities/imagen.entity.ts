import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Imagen {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  partidoId: string;
}
