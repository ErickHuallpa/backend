import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
export class PartidoPolitico {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  fundacion: Date;

  @Column()
  logoUrl: string;

  @Column()
  siglas: string;
}
