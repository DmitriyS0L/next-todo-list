import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { TodoLabelEnum, TodoStatusEnum, TodoPriorityEnum, TodoTypeEnum } from '@libs/shared';
import { TodoCheckListItem } from './checklist.entity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  title!: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('enum', { enum: TodoStatusEnum, default: TodoStatusEnum.PENDING })
  status!: TodoStatusEnum;

  @Column('enum', { enum: TodoTypeEnum })
  type!: TodoTypeEnum;

  @Column('enum', { enum: TodoPriorityEnum })
  priority!: TodoPriorityEnum;

  @Column('text', { array: true, default: '{}' })
  labels?: TodoLabelEnum[];

  @Column('text', { array: true, nullable: true })
  comment?: string[] | null;

  @Column({ type: 'timestamp', nullable: true })
  deadline?: Date;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @OneToMany(() => TodoCheckListItem, (item) => item.todo, { cascade: true })
  checklist?: TodoCheckListItem[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
