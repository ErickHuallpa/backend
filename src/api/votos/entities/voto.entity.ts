import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Voto {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  presidenteViceId: string;

  @Column()
  gobernadorId: string;
}
