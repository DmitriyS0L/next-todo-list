import { IUser, UserRoleEnum } from '@libs/shared';
import { TodoEntity } from '../../todo/entity/todo.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'enum', default: UserRoleEnum.USER, enum: UserRoleEnum })
  role!: UserRoleEnum;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => TodoEntity, (todo) => todo.user, { cascade: true })
  todos!: TodoEntity[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;
}
