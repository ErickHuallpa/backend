import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Actividad {
    @ObjectIdColumn()
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
    candidatoId: string;
}
