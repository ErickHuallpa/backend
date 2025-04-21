import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Actividad {
    @ObjectIdColumn()  // Usamos ObjectIdColumn para indicar que es un campo especial (_id)
    _id: ObjectId;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    fecha: Date;

    @Column({ default: 'pendiente' })
    estado: 'pendiente' | 'en_progreso' | 'completado';

    @Column()
    partidoId: string;
}
