import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TodoLabelEnum, TodoStatusEnum, TodoPriorityEnum, TodoTypeEnum, ITodo } from '@libs/shared';
import { TodoCheckListItem } from './checklist.entity';
import { User } from '../../users/entities/user.entity';

@Entity('todos')
export class TodoEntity implements ITodo {
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
  priority?: TodoPriorityEnum;

  @Column('text', { array: true, default: '{}' })
  labels?: TodoLabelEnum[];

  @Column('text', { array: true, nullable: true })
  comment?: string[];

  @Column({ type: 'timestamp', nullable: true })
  deadline?: Date;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @OneToMany(() => TodoCheckListItem, (item) => item.todo, { cascade: true })
  checklist?: TodoCheckListItem[];

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  userId!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null;
}
