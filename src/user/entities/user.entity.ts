import { Role } from 'src/access-control/entities/role.entitiy';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'primer_nombre' })
  primerNombre: string;

  @Column({ nullable: false, name: 'segundo_nombre' })
  segundoNombre: string;

  @Column({ nullable: false })
  apellidos: string;

  @Column({ nullable: false, unique: true })
  correo: string;

  @Column()
  telefono: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.users, { eager: true, nullable: true })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
