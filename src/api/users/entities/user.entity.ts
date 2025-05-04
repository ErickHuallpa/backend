import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
  
  @Column()
  partidoId: string;
}
