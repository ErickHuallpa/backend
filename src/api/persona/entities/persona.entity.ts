import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Persona {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  cedulaIdentidad: string;

  @Column()
  ciudad: string;

  @Column()
  fechaNacimiento: Date;

  @Column({ default: false })
  yaVoto: boolean;
}
